// import express, cors and mongodb
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// create app and port
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

// mongodb user and password
// mdbelayethossain015_db_user
// ZWMgwMQEVy3YTnmJ

// mongodb code

const uri = "mongodb+srv://mdbelayethossain015_db_user:ZWMgwMQEVy3YTnmJ@cluster0.i1okxyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create collection
    const userCollection = client.db("usersDb").collection("users")

    // get API 
    app.get("/users", async(req, res) =>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get(`/users/:id`, async(req, res) =>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await userCollection.findOne(query);
      res.send(result);
    })

    // post API for send data client to server to database
    app.post("/users", async (req, res) =>{
        const user = req.body;
        console.log("New user", user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    // put API for updating data and send these data from client to server and server to database
    app.put("/users/:id", async(req, res) =>{
      const id = req.params.id;
      const user = req.body;
      console.log(id, user);

      //Create a filter for user with the _id ObjectId"id"
      const filter = {_id: new ObjectId(id)};
      // Set the upsert option to insert a document if no documents match the filter
      const option = {upsert: true};
      const updatedUser = {
        $set:{
          name: user.name,
          email: user.email
        }
      };
      const result = await userCollection.updateOne(filter,updatedUser, option);
      res.send(result)
    })

    // Delete API for delete data from database
    app.delete("/users/:id", async(req, res) =>{
      const id = req.params.id;
      console.log("Please delete", id);

      /* Delete the first document in the "userCollection" collection that matches the specified query document */
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// get API
app.get("/", (req, res) =>{
    res.send("Simple server is running")
})

// app listen
app.listen(port, () =>{
    console.log(`Simple server is running on port: ${port}`);
})




// const run = async() =>{

// }

// async function run(){
// try{
    
// }
// catch{
 
// }
// finally{

// }
// }

// run().catch(error => console.error(error));

