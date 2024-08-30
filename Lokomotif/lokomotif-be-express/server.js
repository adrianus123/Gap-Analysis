const express = require("express");
const { producer, consumer } = require("./KafkaConfig");
const { mongoose } = require("./config/mongoConfig");
const Locomotive = require("./schema/locomotive");
const { default: axios } = require("axios");
const app = express();
const PORT = 3000;
const BASE_URL = "http://localhost:3000";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get("/locomotive", async (req, res) => {
  try {
    const locomotive = await Locomotive.find().exec();
    res.json({ data: locomotive });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.get("/get-kafka", async (req, res) => {
  try {
    await consumer.connect();
    await consumer.stop();
    await consumer.subscribe({
      topic: "loco-topic",
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        axios
          .post(`${BASE_URL}/store-data`, JSON.parse(message.value))
          .then((res) => console.log(`Success: ${JSON.stringify(res.data)}`))
          .catch((err) => console.error(`Failed: ${err}`));
      },
    });

    res.json({ message: "Get data from Kafka and store to MongoDB" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error });
  }
});

app.post("/store-data", async (req, res) => {
  try {
    await Locomotive.create(req.body.data);
    res.json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/receive-data", async (req, res) => {
  try {
    const data = req.body;

    await producer.connect();
    await producer.send({
      topic: "loco-topic",
      messages: [{ value: JSON.stringify(data) }],
    });

    // axios.get(`${BASE_URL}/get-kafka`);
    res.json({ message: "Data berhasil dikirim" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});
