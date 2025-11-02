// index.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ✅ WEBHOOK VERIFICATION (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "megapos123"; // Facebook Developer'da girdiğin token

  // Facebook’un gönderdiği query parametreleri al
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Parametreleri kontrol et
  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED");
      res.status(200).send(challenge); // Facebook’a challenge geri gönder
    } else {
      console.log("❌ WEBHOOK VERIFICATION FAILED");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ✅ WHATSAPP MESSAGE HANDLER (POST)
app.post("/webhook", (req, res) => {
  console.log("📩 Yeni webhook verisi alındı:");
  console.log(JSON.stringify(req.body, null, 2));

  // Meta webhook cevabına zorunlu 200 OK dönüyoruz
  res.sendStatus(200);
});

// ✅ SERVER START
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Webhook URL: https://whatsapp-app-webhook.onrender.com/webhook`);
});
