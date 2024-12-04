import { expect } from 'chai';
import kue from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue();
    kue.Job.testMode.enter(); // Enter test mode
  });

  afterEach(() => {
    kue.Job.testMode.clear(); // Clear the queue
    kue.Job.testMode.exit();  // Exit test mode
  });

  it('should display an error message if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs('not an array', queue)).to.throw(
      'Jobs is not an array'
    );
  });

  it('should create two new jobs to the queue', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is the code 5678 to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(kue.Job.testMode.jobs.length).to.equal(2);

    const job1 = kue.Job.testMode.jobs[0];
    const job2 = kue.Job.testMode.jobs[1];

    expect(job1.type).to.equal('push_notification_code_3');
    expect(job1.data).to.deep.equal(jobs[0]);

    expect(job2.type).to.equal('push_notification_code_3');
    expect(job2.data).to.deep.equal(jobs[1]);
  });
});
