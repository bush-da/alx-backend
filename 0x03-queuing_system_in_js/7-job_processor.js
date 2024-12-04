import kue from 'kue';

// Create the queue
const queue = kue.createQueue();

// Blacklisted phone numbers
const blacklistedNumbers = ['4153518780', '4153518781'];

/**
 * Function to process the notification job
 * @param {string} phoneNumber - The phone number to send the notification to
 * @param {string} message - The notification message
 * @param {object} job - The job object
 * @param {function} done - The callback function to indicate job completion or failure
 */
const sendNotification = (phoneNumber, message, job, done) => {
  // Track progress: 0%
  job.progress(0, 100);

  // Check if the phone number is blacklisted
  if (blacklistedNumbers.includes(phoneNumber)) {
    return done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  // Track progress: 50%
  job.progress(50, 100);

  // Log the notification
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);

  // Complete the job
  done();
};

// Process the queue
queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
