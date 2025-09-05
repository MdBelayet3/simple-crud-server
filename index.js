// import express, cors and mongodb
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

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

const uri = "mongodb+srv://@cluster0.i1okxyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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


    // post API for send data client to server to database
    app.post("/users", (req, res) =>{
        const user = req.body;
        console.log("New user", user);
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


