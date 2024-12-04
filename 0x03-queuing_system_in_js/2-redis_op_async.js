import { createClient, print } from 'redis';
import { promisify } from 'util';

// Create a Redis client
const client = createClient();

// Handle connection events
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

// Promisify the `get` function
const getAsync = promisify(client.get).bind(client);

// Function to set a key-value pair in Redis
const setNewSchool = (schoolName, value) => {
  client.set(schoolName, value, print); // redis.print logs the response (e.g., "Reply: OK")
};

// Function to get a value from Redis using async/await
const displaySchoolValue = async (schoolName) => {
  try {
    const value = await getAsync(schoolName);
    console.log(value); // Log the value to the console
  } catch (err) {
    console.error(`Error fetching value for ${schoolName}: ${err.message}`);
  }
};

// Call the functions as required
(async () => {
  await displaySchoolValue('Holberton'); // Should log: "School" (if set earlier)
  setNewSchool('HolbertonSanFrancisco', '100'); // Should log: "Reply: OK"
  await displaySchoolValue('HolbertonSanFrancisco'); // Should log: "100"
})();
