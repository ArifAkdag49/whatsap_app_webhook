import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 👋 Basit test endpoint (Render ve Meta bağlantısını kontrol etmek için)
app.get("/", (req, res) => {
  res.send("✅ Webhook server is running. Use /webhook for verification.");
});

// ✅ Meta Webhook doğrulama (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "megapos123"; // Meta Developer Portal'da girdiğin token
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED!");
      res.status(200).send(challenge);
    } else {
      console.log("❌ WEBHOOK VERIFICATION FAILED!");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ✅ Meta'dan gelen mesajları dinleyen endpoint (POST)
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming webhook message:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// 🚀 Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Webhook server is running on port ${PORT}`);
});
