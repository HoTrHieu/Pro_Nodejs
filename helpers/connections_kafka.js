// import {Kafka, logLevel} from 'kafkajs'
// import {faker} from '@faker-js/faker'

// const EXAMPLE_TOPIC = 'example-topic'
// const EXAMPLE_CONSUMER = 'example-consumer'
// const KAFKA_BROKER_ADDRESS = process.env.KAFKA_BROKER;

// const kafka = new Kafka({brokers: [KAFKA_BROKER_ADDRESS], logLevel: logLevel.ERROR})
// const producer = kafka.producer()
// const consumer = kafka.consumer({groupId: EXAMPLE_CONSUMER})

// async function main() {
//   await producer.connect()
//   await consumer.connect()

//   await consumer.subscribe({topic: EXAMPLE_TOPIC})

//   await consumer.run({
//     eachMessage: async ({message}) => {
//       console.log({
//         offset: message.offset,
//         value: message.value.toString(),
//         key: message.key.toString(),
//       })
//     },
//   })

//   process.on('SIGTERM', async () => {
//     await consumer.disconnect()
//     await producer.disconnect()
//     process.exit(0)
//   })

//   while (true) {
//     await new Promise(async (res) => {
//       await producer.send({
//         topic: EXAMPLE_TOPIC,
//         messages: [{key: faker.internet.userName(), value: faker.internet.emoji()}],
//       })

//       setTimeout(() => res(null), 3 * Math.random() * 1000)
//     })
//   }
// }

// main()


const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'kafka-dona',
  brokers: ['localhost:9092'],
  // ssl: true,
  // logLevel: 2,
  // sasl: {
  //   mechanism: 'plain',
  //   username: 'xxxxxxxxxxx',
  //   password: 'xxxxxxxxxx'
  // }
})



const producer = kafka.producer()

// async function main() {
//   try {
//     const check = await producer.connect()
//     console.log('check: ', check)
//   } catch (error) {
//     console.log('error: ', error)
//   }

// }

// main();

const checkKafkaConnection = async () => {
  try {
    const admin = kafka.admin();
    await admin.connect();
    console.log('Kafka connected successfully');
    // await admin.disconnect();
  } catch (error) {
    console.error('Error connecting to Kafka:', error);
  }
};

checkKafkaConnection();



// const run = async () => {
//   // Producing
//   await producer.connect()
//   await producer.send({
//     topic: 'test-topic',
//     messages: [
//       { value: 'Hello KafkaJS user!' },
//     ],
//   })

// }

// run().catch(console.error)
