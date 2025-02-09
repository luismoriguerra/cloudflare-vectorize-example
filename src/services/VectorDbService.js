export class VectorDbService {
  constructor(vectorIndex) {
    this.vectorIndex = vectorIndex;
  }

  async upsertVector(id, values) {
    return await this.vectorIndex.upsert([
      {
        id: id.toString(),
        values,
      }
    ]);
  }

  async queryVector(vector, topK = 1) {
    const result = await this.vectorIndex.query(vector, { topK });
    if (result.matches && result.matches.length > 0 && result.matches[0]) {
      return result.matches[0].id;
    }
    return null;
  }

  async deleteVector(id) {
    return await this.vectorIndex.deleteByIds([id.toString()]);
  }

  async getAllVectors() {
    const result = await this.vectorIndex.listVectors();
    return result.vectors || [];
  }

  async getVectorById(id) {
    const result = await this.vectorIndex.fetch([id.toString()]);
    return result.vectors?.[0] || null;
  }
}
