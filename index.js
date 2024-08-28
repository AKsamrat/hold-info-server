const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://scic-task-two.netlify.app'],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());

// verify jwt middleware

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nj7eiar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const dataCollection = client.db('task_two').collection('datas');

    //get all product api==========<<<<<<<<<<<<<<<

    app.get('/pData', async (req, res) => {
      const result = await dataCollection.find().toArray();
      res.send(result);
    });

    //mr manager payment check

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Hello from product management Server....');
});

app.listen(port, () => console.log(`Server running on port ${port}`));
