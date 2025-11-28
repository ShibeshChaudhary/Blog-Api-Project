const express = require("express");
const cors=require('cors');
const authRoutes = require("./routes/auth");

const postRoutes=require("./routes/post");
const app = express();
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);
app.get('/', (req, res) => {
    res.send("Api is running");
});

module.exports = app;
