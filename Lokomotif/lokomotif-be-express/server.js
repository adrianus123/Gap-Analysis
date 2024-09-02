const express = require("express");
const { mongoose } = require("./config/mongoConfig");
const { Kafka, Partitioners } = require("kafkajs");
const Locomotive = require("./schema/locomotive");
const app = express();
const PORT = 3000;

app.use(express.json());

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9094"],
});

const producer = kafka.producer({
  createPartitioner: Partitioners.LegacyPartitioner,
});
const consumer = kafka.consumer({ groupId: "loco-group" });

const createProducer = async () => {
  await producer.connect();
};

const createConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "loco-topic",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const object = JSON.parse(message.value);
        const saveData = await Locomotive.create(object.data);
        console.log("Data berhasil disimpan ke MongoDB: ", saveData);
      } catch (error) {
        console.error("Error simpan data ke MongoDB: ", error.message);
      }
    },
  });
};

createProducer();
createConsumer();

app.post("/receive-data", async (req, res) => {
  try {
    const data = req.body;

    await producer.send({
      topic: "loco-topic",
      messages: [{ value: JSON.stringify(data) }],
    });

    res.json({ message: "Data berhasil dikirim ke Kafka" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error kirim data ke Kafka: ${error.message}"` });
  }
});

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await producer.disconnect();
  await consumer.disconnect();
  process.exit(0);
});
