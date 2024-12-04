/**
 * Function to create push notification jobs.
 * @param {Array} jobs - Array of job objects, each containing phoneNumber and message.
 * @param {Object} queue - Kue queue to add jobs to.
 */
export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }

  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);

    // Log job creation
    job
      .on('enqueue', () => {
        console.log(`Notification job created: ${job.id}`);
      })
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', (errorMessage) => {
        console.log(`Notification job ${job.id} failed: ${errorMessage}`);
      })
      .on('progress', (progress) => {
        console.log(`Notification job ${job.id} ${progress}% complete`);
      });

    job.save((err) => {
      if (err) {
        console.error(`Error saving job: ${err.message}`);
      }
    });
  });
}
