import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ✅ Webhook doğrulama endpoint (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "megapos123"; // Meta panelinde yazdığın token

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WEBHOOK VERIFIED");
      res.status(200).send(challenge);
    } else {
      console.log("❌ VERIFICATION FAILED");
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// ✅ Webhook POST endpoint (mesajlar buraya gelir)
app.post("/webhook", (req, res) => {
  console.log("📩 Gelen veri:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Sunucuyu başlat
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
