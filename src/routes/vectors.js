import { Hono } from 'hono';
import { VectorDbService } from '../services/VectorDbService';

const vectors = new Hono();

vectors.get('/all', async (c) => {
    const vectorDbService = new VectorDbService(c.env.VECTOR_INDEX);
    try {
        const vectors = await vectorDbService.getAllVectors();
        return c.json(vectors);
    } catch (error) {
        console.error('Error listing vectors:', error);
        return c.text(error.message, 500);
    }
});

vectors.get('/:id', async (c) => {
    const { id } = c.req.param();
    const vectorDbService = new VectorDbService(c.env.VECTOR_INDEX);

    try {
        const vector = await vectorDbService.getVectorById(id);
        if (!vector) {
            return c.text('Vector not found', 404);
        }
        return c.json(vector);
    } catch (error) {
        console.error('Error getting vector:', error);
        return c.text(error.message, 500);
    }
});

export default vectors;
