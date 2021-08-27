const mongoose = require("mongoose");
require('dotenv').config();
module.exports = connect = async ()=>{
    try{
        const response = await mongoose.connect(process.env.MONGO_DB_URL,
            { 
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useFindAndModify: false   
            });
        console.log("Sucessfully Connected");
    }  catch (error){
        console.log("DB not Connected :", error);
    }
}
