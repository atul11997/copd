import { MongoClient } from 'mongodb';

// MongoDB connection string
// const uri = process.env.MONGO_URI;
const uri = "mongodb+srv://Vercel-Admin-atlas-teal-chair:ERs8ajlkaDRMuCJ4@atlas-teal-chair.6sslueb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Connect to MongoDB
      await client.connect();

      const database = client.db('doctor_forms'); // Database name
      const collection = database.collection('doctors'); // Collection name

      // Fetch all records from the "submissions" collection
      const records = await collection.find({}).toArray(); // Retrieves all documents

      // Send the records as JSON response
      res.status(200).json(records);
    } catch (error) {
      console.error("Error fetching records:", error);
      res.status(500).json({ error: 'Failed to fetch data from MongoDB', message: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Only GET method is allowed
  }
}
