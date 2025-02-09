export class NotesService {
  constructor(db) {
    this.db = db;
  }

  async createNote(text) {
    const query = "INSERT INTO notes (text) VALUES (?) RETURNING *";
    const { results } = await this.db.prepare(query)
      .bind(text)
      .run();

    const record = results[0];
    if (!record) throw new Error("Failed to create note");
    return record;
  }

  async getNoteById(id) {
    const query = "SELECT * FROM notes WHERE id = ?";
    const { results } = await this.db.prepare(query)
      .bind(id)
      .all();
    return results?.[0] || null;
  }

  async deleteNote(id) {
    const query = "DELETE FROM notes WHERE id = ?";
    return await this.db.prepare(query)
      .bind(id)
      .run();
  }

  async getAllNotes() {
    const query = "SELECT * FROM notes ORDER BY id DESC";
    const { results } = await this.db.prepare(query).all();
    return results || [];
  }
}
