import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/webhook", (req, res) => {
  const verifyToken = "megapos123";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verifyToken) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post("/webhook", (req, res) => {
  console.log("Incoming webhook:", req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`✅ Webhook running on port ${PORT}`));
