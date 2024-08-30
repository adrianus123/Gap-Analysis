const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1/locomotive";

mongoose
  .connect(dbUrl)
  .then(() => console.log("Berhasil terhubung ke database"))
  .catch((error) => console.error("Gagal terhubung ke database"));

module.exports = mongoose;
