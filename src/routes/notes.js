import { Hono } from 'hono';
import { NotesService } from '../services/NotesService';
import { LLMService } from '../services/LLMService';
import { VectorDbService } from '../services/VectorDbService';

const notes = new Hono();

notes.post('/', async (c) => {
	const { text } = await c.req.json();
	if (!text) return c.text("Missing text", 400);

	const notesService = new NotesService(c.env.DB);
	const llmService = new LLMService(c.env.AI);
	const vectorDbService = new VectorDbService(c.env.VECTOR_INDEX);

	try {
		// Create note
		const record = await notesService.createNote(text);

		// Generate and store embedding
		const values = await llmService.generateEmbeddings(text);
		await vectorDbService.upsertVector(record.id, values);

		return c.text("Created note", 201);
	} catch (error) {
		console.error('Error creating note:', error);
		return c.text(error.message, 500);
	}
});

notes.get('/all', async (c) => {
	const notesService = new NotesService(c.env.DB);

	try {
		const notes = await notesService.getAllNotes();
		return c.json(notes);
	} catch (error) {
		console.error('Error listing notes:', error);
		return c.text(error.message, 500);
	}
});

notes.get('/', async (c) => {
	const question = c.req.query('text') || "What is the square root of 9?";

	const notesService = new NotesService(c.env.DB);
	const llmService = new LLMService(c.env.AI);
	const vectorDbService = new VectorDbService(c.env.VECTOR_INDEX);

	try {
		// Get relevant vector
		const vectors = await llmService.generateEmbeddings(question);
		const vecId = await vectorDbService.queryVector(vectors);

		// Get notes context
		let contextMessage = '';
		if (vecId) {
			const note = await notesService.getNoteById(vecId);
			if (note) {
				contextMessage = `Context:\n- ${note.text}`;
			}
		}

		// Get answer from LLM
		const answer = await llmService.getAnswer(question, contextMessage);
		return c.text(answer);
	} catch (error) {
		console.error('Error processing question:', error);
		return c.text(error.message, 500);
	}
});

notes.delete('/:id', async (c) => {
	const { id } = c.req.param();

	const notesService = new NotesService(c.env.DB);
	const vectorDbService = new VectorDbService(c.env.VECTOR_INDEX);

	try {
		await notesService.deleteNote(id);
		await vectorDbService.deleteVector(id);
		return c.status(204);
	} catch (error) {
		console.error('Error deleting note:', error);
		return c.text(error.message, 500);
	}
});

export default notes;
