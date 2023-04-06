import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config.js';
import routes from './routes/user.mjs';
import cors from "cors";

const app = express();
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200
};
app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

app.use(express.json());

//routes
app.get("/", (req, res) =>{
    res.send("Working")
});
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
.then(() =>console.log("Connected to MongoDB"))
.catch((error) => console.error(error));

app.listen(port, ()=> console.log('server listening on port', port));