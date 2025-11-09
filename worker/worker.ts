import { Worker } from 'bullmq'
import { processNotification } from './worker-utils'

const worker = new Worker('notification-queue', async (job) => {
  await processNotification(job.data)
})

console.log('Worker started...')
