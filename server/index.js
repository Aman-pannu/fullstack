require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {

  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected')
  app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
}).catch((err) => console.error('MongoDB connection error:', err));


const recordSchema = new mongoose.Schema({
  field1: String,
  field2: String,
  field3: String,
  field4: String
});

const Record = mongoose.model('Record', recordSchema);

app.use(cors());
app.use(bodyParser.json());

app.get('/records', async (req, res) => {
  const records = await Record.find();
  res.json(records);
});

app.post('/records', async (req, res) => {
  const newRecord = new Record(req.body);
  await newRecord.save();
  res.status(201).json(newRecord);
});

app.put('/records/:id', async (req, res) => {
  try {
    const updated = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
});

app.delete('/records/:id', async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

/* app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); */
