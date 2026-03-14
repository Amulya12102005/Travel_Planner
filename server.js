const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connect to your Local MongoDB Compass
mongoose.connect('mongodb://127.0.0.1:27017/TravelPlanner')
    .then(() => console.log("Connected to MongoDB Compass!"))
    .catch(err => console.error("Connection error:", err));

// 2. Define the Structure
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Contact = mongoose.model('Contact', ContactSchema);

// 3. The Route to handle the form
app.post('/api/contact', async (req, res) => {
    try {
        const entry = new Contact(req.body);
        await entry.save();
        res.status(200).send({ success: true }); // Tells the frontend it worked
    } catch (error) {
        res.status(500).send({ success: false });
    }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));