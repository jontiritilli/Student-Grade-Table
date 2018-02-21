const express = require('express');
const PORT = process.env.PORT || 9000;
const mongoose = require('mongoose');
const {resolve} = require('path');
const cors = require('cors');
const {db_connect} = require('./config');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect(db_connect).then(()=> {
    console.log('database is connected');
}).catch(err=> {
    console.log('error connecting to the database', err.message);
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(resolve(__dirname, '..', 'client')))
authRoutes(app);

app.post('/testpost', (req,res)=>{
    const dataToSend = {
        message: 'received data, sending data back',
        received: req.body
    };
    res.send( dataToSend );
})
app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'index.html'))
})

app.listen(PORT, ()=> {
    console.log('the system is running on port:', PORT);
})