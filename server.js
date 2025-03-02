import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv, { parse } from 'dotenv'
import bodyParser from 'body-parser'
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassManager';

const app = express()
const port = 3000
app.use(bodyParser.json())

client.connect();
// Get all the passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
  const collection = db.collection('Passwords');    
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})
// Saving Passwords
app.post('/', async(req, res) => {
  let password = req.body
    const db = client.db(dbName);
  const collection = db.collection('Passwords');    
  const findResult = await collection.insertOne(password);
  res.send(
    {
    Success:true, 
    result : findResult
  })
})
app.delete('/', async(req, res) => {
  let password = req.body
    const db = client.db(dbName);
  const collection = db.collection('Passwords');    
  const findResult = await collection.deleteOne (password);
  res.send(
    {
    Success:true, 
    result : findResult
  })
})
// Delete Passwords
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})