import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// 🔹 Webhook doğrulama endpoint'i
app.get("/webhook", (req, res) => {
  const verifyToken = "megapos123"; // Meta'da girdiğin token

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token === verifyToken) {
    console.log("✅ WEBHOOK VERIFIED");
    res.status(200).send(challenge);
  } else {
    console.log("❌ WEBHOOK VERIFICATION FAILED");
    res.sendStatus(403);
  }
});

// 🔹 Webhook mesajlarını almak için POST endpoint
app.post("/webhook", (req, res) => {
  console.log("📩 Gelen veri:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`🚀 Webhook server running on port ${PORT}`));
