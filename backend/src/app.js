const express = require("express");
const cors = require("cors");
require("dotenv").config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY);

const scanRoutes = require("./routes/scanRoutes");
const fileRoutes = require("./routes/fileRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiRoutes = require("./routes/aiRoutes");
const app = express();

app.use(cors());
app.use(express.json());


app.use("/scan", scanRoutes);
app.use("/files", fileRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/ai", aiRoutes);





app.get("/", (req, res) => {
    res.json({
        status: "MacMind API Running"
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});