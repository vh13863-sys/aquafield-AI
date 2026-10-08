const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===============================
// HOME ROUTE
// ===============================
app.get("/", (req, res) => {
    res.json({
        message: "AquaField AI Backend is running 🌱💧"
    });
});

// ===============================
// DASHBOARD ROUTE
// ===============================
app.get("/api/dashboard", (req, res) => {
    res.json({
        waterSecurity: 68,
        rainfall: 72,
        waterAvailability: 61,
        waterDemand: 75,
        elNinoRisk: "Moderate",
        status: "Stable",
        recommendation:
            "Reduce non-essential water usage and increase water storage."
    });
});

// ===============================
// AI INSIGHTS ROUTE
// ===============================
app.get("/api/insights", (req, res) => {
    res.json({
        title: "El Niño Water Insights",
        risk: "Moderate",
        insight:
            "Rainfall uncertainty may affect water availability in the coming months.",
        actions: [
            "Increase water storage",
            "Reduce non-essential consumption",
            "Monitor rainfall regularly"
        ]
    });
});

// ===============================
// SIMULATOR ROUTE
// ===============================
app.post("/api/simulator", (req, res) => {
    const { rainfallChange = 0, demandChange = 0 } = req.body;

    const waterSecurity = Math.max(
        0,
        Math.min(100, 68 + rainfallChange - demandChange)
    );

    res.json({
        rainfallChange,
        demandChange,
        predictedWaterSecurity: waterSecurity,
        message: "Simulation completed successfully."
    });
});

// ===============================
// ACTIONS ROUTE
// ===============================
app.get("/api/actions", (req, res) => {
    res.json({
        actions: [
            {
                title: "Increase Water Storage",
                priority: "High",
                status: "Recommended"
            },
            {
                title: "Reduce Water Consumption",
                priority: "Medium",
                status: "Recommended"
            },
            {
                title: "Monitor Rainfall",
                priority: "High",
                status: "Active"
            }
        ]
    });
});

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`🌱 AquaField AI Backend running at http://localhost:${PORT}`);
});