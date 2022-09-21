const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require("./routes/apiRoutes.js");

// initialize the app and creating port
const app = express();
const PORT = process.env.PORT || 3001;

// import our routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes)
app.use('/', htmlRoutes);



// Staring server on port
app.listen(PORT , () => console.log(`Listening to server on ${PORT}`))