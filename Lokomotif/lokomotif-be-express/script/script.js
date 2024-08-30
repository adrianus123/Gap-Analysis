const { consumer, producer } = require("../KafkaConfig");

async function createProducer() {
  await producer.connect();

  await producer.send({
    topic: "loco-topic",
    messages: [{ value: "Hello from Kafka" }],
  });
}

async function createConsumer() {
  await consumer.connect();
  await consumer.subscribe({
    topic: "loco-topic",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        topic,
        partition,
        { offset: message.offset },
        { value: message.value.toString() }
      );
    },
  });
}

module.exports = {
  createProducer,
  createConsumer,
};
