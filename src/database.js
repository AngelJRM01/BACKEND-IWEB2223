const mongoose = require("mongoose");

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const uri = process.env.MONGODB_URI;

async function connectMongoose(){
    await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
        console.log("mongoose connected...")
    })
}

async function initialLoad(){
    await connectMongoose();
}

initialLoad();