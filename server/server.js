//importing packages
import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//config

const app = express();
app.use(express.json());

// Add a CORS middleware
// app.use((req, res, next) => {
// Allow requests from multiple origins
//   const allowedOrigins = [
//     "http://127.0.0.1:5503",
//     "https://week-05-assignment-client.onrender.com",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// app.use(
//   cors({
//     origin: ["http://localhost:5173","http://localhost:5503"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// fix maybe
app.use(cors());

dotenv.config();

//connecting to the database

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

//root route of the server

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the root route" });
});

// POST route
app.post("/newBooking", async function (req, res, next) {
  try {
    const body = req.body;
    const query = await db.query(
      `INSERT INTO bookings ( hotel_name,
    customer_name,
    customer_phone,
    customer_email,
    check_in,
    check_out, booking_notes) VALUES($1, $2, $3, $4, $5, $6, $7)RETURNING *`,
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

    if (query.rows.length === 0) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(201).json({
      success: true,
      data: query.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

//setting up a route to READ data from the database

// app.get("/newBooking", async (req, res) => {
//   // query database
//   const query = await db.query(`SELECT * FROM bookings ORDER BY id`);
//   //parse the query into JSON
//   const data = res.json(query.rows);
// });

// GET route for the most recent booking
app.get("/newBooking/latest", async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM bookings ORDER BY id DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      const error = new Error("Booking not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
});

// Error handling
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
    },
  });
};

app.use(errorHandler);

// Creating the server port
app.listen(8080, () => {
  console.log("server is working on port 8080");
});
