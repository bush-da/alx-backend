import express from 'express';
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const app = express();
const PORT = 1245;

// Redis Client Setup
const client = redis.createClient();
const reserveSeat = (number) => client.set('available_seats', number);
const getCurrentAvailableSeats = promisify(client.get).bind(client);

// Kue Queue Setup
const queue = kue.createQueue();

// Global variables
let reservationEnabled = true;

// Initialize available seats
reserveSeat(50);

// Routes

// GET /available_seats
app.get('/available_seats', async (req, res) => {
  const availableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats: availableSeats });
});

// GET /reserve_seat
app.get('/reserve_seat', async (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat').save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }
    res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

// GET /process
app.get('/process', (req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (job, done) => {
    const availableSeats = await getCurrentAvailableSeats();
    const seats = parseInt(availableSeats, 10);

    if (seats > 0) {
      reserveSeat(seats - 1);
      if (seats - 1 === 0) {
        reservationEnabled = false;
      }
      done();
    } else {
      done(new Error('Not enough seats available'));
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
