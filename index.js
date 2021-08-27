const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const connect = require("./config/db");
const router = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const profileRoutes = require("./routes/profileRoutes");
const userAdminRoutes = require("./routes/userAdminRoutes");
const app = express();

require('dotenv').config();

//calling database to connect
connect();
 
// Body-parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  })

app.use("/", router);
app.use("/", postRouter);
app.use("/", profileRoutes);
app.use("/", userAdminRoutes);
const PORT = process.env.PORT || '8000';
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/frontend/build/")));
    app.get('*', (req, res)=>{
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
    });
}
app.listen(PORT,()=>{
    console.log('The Port is running : ', PORT);
});