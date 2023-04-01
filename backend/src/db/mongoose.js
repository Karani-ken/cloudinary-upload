const mongoose = require('mongoose')

let mongoURL = 'mongodb+srv://kenneth:E9zb3q3340@cluster0.jznelf8.mongodb.net/cloudinary-uploads'
mongoose.connect(mongoURL)

let db = mongoose.connection;

db.on('connected', ()=>{
    console.log(`Mongo Db connection successful`)

});

db.on ('error',()=>{
    console.log(`Mongo db connection failed`)

})

module.exports = mongoose