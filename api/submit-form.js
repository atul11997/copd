import { MongoClient } from "mongodb";
import moment from "moment-timezone";

// MongoDB connection string
// const uri = process.env.MONGO_URI;
const uri = "mongodb+srv://Vercel-Admin-atlas-teal-chair:ERs8ajlkaDRMuCJ4@atlas-teal-chair.6sslueb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method === "POST") {
    const { drname, mslno, state } = req.body; // <-- match frontend

    try {
      await client.connect();
      const database = client.db("doctor_forms"); // Database name
      const collection = database.collection("doctors"); // Collection name

      const istDate = moment().tz("Asia/Kolkata").toDate();

      // Insert form data into MongoDB
      const result = await collection.insertOne({
        drname,
        mslno,
        state,
        createdAt: istDate,
      });

      res
        .status(200)
        .json({ message: "Form submitted successfully!", data: result });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to store data in MongoDB", message: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
