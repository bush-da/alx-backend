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

// Function to set a key-value pair in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print); // redis.print logs the response (e.g., "Reply: OK")
};

// Function to get a value from Redis
const displaySchoolValue = (schoolName) => {
  client.get(schoolName, (err, value) => {
    if (err) {
      console.error(`Error fetching value for ${schoolName}: ${err.message}`);
    } else {
      console.log(value); // Log the value to the console
    }
  });
};

// Call the functions as required
displaySchoolValue('Holberton'); // Should log: "School" (if set earlier)
setNewSchool('HolbertonSanFrancisco', '100'); // Should log: "Reply: OK"
displaySchoolValue('HolbertonSanFrancisco'); // Should log: "100"
