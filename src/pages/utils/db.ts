import { MongoClient, Db } from 'mongodb';
let db: Db | null = null;
export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(process.env.MONGODB_DB_NAME);
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

