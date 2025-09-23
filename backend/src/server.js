import express from "express";
import "dotenv/config";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

//for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(3000, () => console.log(`Server running on port: ${PORT}`));
