export class LLMService {
  constructor(ai) {
    this.ai = ai;
  }

  async generateEmbeddings(text) {
    const embeddings = await this.ai.run('@cf/baai/bge-base-en-v1.5', { text });
    return embeddings.data[0];
  }

  async getAnswer(question, context = '') {
    const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`;

    const messages = [
      ...(context ? [{ role: 'system', content: context }] : []),
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question }
    ];

    const { response } = await this.ai.run('@cf/meta/llama-3-8b-instruct', { messages });
    return response;
  }
}
