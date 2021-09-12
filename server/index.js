const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoutes");
const movieRoute = require("./Routes/MovieRoutes");
const movielistRoute = require("./Routes/MovieListRoutes");
const cors = require('cors')  ;
 

 


app.use(express.json()) ; 
app.use(cors())




app.use("/api/auth/",authRoute) ; 

app.use ('/api/user/',userRoute) ; 
app.use ('/api/movie/',movieRoute) ; 
app.use ('/api/list/',movielistRoute) ; 


const cluster_url = process.env.NETFLIX_CLUSTER ; 

const PORT = process.env.PORT || 8000

mongoose.connect(cluster_url, {useUnifiedTopology:true,useNewUrlParser:true,useFindAndModify:false,useCreateIndex:true})
.then(app.listen(PORT,()=>console.log(`Server connected to port ${PORT} `)))
.catch((error)=>console.log(error))






