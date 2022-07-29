const dotenv = require('dotenv').config()
const message_model = require('./model/message-model')




message_model.find({}, (err, data) => {

    if(err){
    console.log(err)
    }
    console.log(data)
    
}).select({_id: 0, __v: 0})


