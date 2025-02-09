/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Hono } from "hono";
import notes from './routes/notes';
import vectors from './routes/vectors';

const app = new Hono();

app.route('/notes', notes);
app.route('/vectors', vectors);

app.get('/', (c) => {
	return c.text('Hello World');
});

app.onError((err, c) => {
	console.error('Application error:', err);
	return c.text(err.message || 'Internal Server Error', 500);
});

export default app;
