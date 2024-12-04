import { createClient, print } from 'redis';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Function to create a hash
const createHolbertonSchoolsHash = () => {
  client.hset('HolbertonSchools', 'Portland', 50, print);
  client.hset('HolbertonSchools', 'Seattle', 80, print);
  client.hset('HolbertonSchools', 'New York', 20, print);
  client.hset('HolbertonSchools', 'Bogota', 20, print);
  client.hset('HolbertonSchools', 'Cali', 40, print);
  client.hset('HolbertonSchools', 'Paris', 2, print);
};

// Function to display the hash
const displayHolbertonSchoolsHash = () => {
  client.hgetall('HolbertonSchools', (err, result) => {
    if (err) {
      console.error(`Error retrieving hash: ${err.message}`);
    } else {
      console.log(result);
    }
  });
};

// Call the functions
createHolbertonSchoolsHash();
displayHolbertonSchoolsHash();
