//importing packages
import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//config

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

dotenv.config();

//connecting to the database

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// creating the server port

app.listen(8080, () => {
  console.log("server is working on port 8080");
});

//root route of the server

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the root route" });
});

// POST route

app.post("/newBooking", async function (req, res) {
  const body = req.body;
  const query = await db.query(
    `INSERT INTO bookings ( hotel_name,
    customer_name,
    customer_phone,
    customer_email,
    check_in,
    check_out, booking_notes) VALUES($1, $2, $3, $4, $5, $6, $7)`,
    [
      body.hotel_name,
      body.customer_name,
      body.customer_phone,
      body.customer_email,
      body.check_in,
      body.check_out,
      body.booking_notes,
    ]
  );
  res.status(201).json({
    success: true,
    data: query.rows[0],
  });
});

//setting up a route to READ data from the database

app.get("/bookings", async (req, res) => {
  // query database
  const query = await db.query(`SELECT * FROM bookings`);
  //parse the query into JSON
  const data = res.json(query.rows);
});
