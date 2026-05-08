import { MONGODB_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const DB_NAME = 'todoapp';

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI is missing. Add it to your .env file.');
}

const globalMongo = globalThis;

if (!globalMongo.mongoClientPromise) {
	const client = new MongoClient(MONGODB_URI);
	globalMongo.mongoClientPromise = client.connect();
}

export async function getDb() {
	const client = await globalMongo.mongoClientPromise;

	return client.db(DB_NAME);
}

export async function getTodosCollection() {
	const db = await getDb();

	return db.collection('todos');
}
