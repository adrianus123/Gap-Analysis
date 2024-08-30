const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "my-group" });

module.exports = {
  producer,
  consumer,
};
