//importing packages
import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";



//config

const app = express();
app.use(express.json());

app.use(cors);

dotenv.config();


//connecting to the database


const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,

}
    
)

// creating the server port

app.listen(5000, () =>{
    console.log("server is working on port 5000");
});


//root route of the server

app.get("/", (req, res) => {
    res.json({message: "Welcome to the root route"});

});
