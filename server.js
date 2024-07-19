const express = require('express');
const mysql = require('mysql2');
const config = require('./config/config.json');
const authRoutes = require('./routes/auth');
const terrainRoutes = require('./routes/terrains');
const coachRoutes = require('./routes/coaches');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
  host: config.mysqlHost,
  user: config.mysqlUser,
  password: config.mysqlPassword,
  database: config.mysqlDatabase,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// Make db pool available to routes
app.use((req, res, next) => {
  req.db = pool.promise();
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/terrains', terrainRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
