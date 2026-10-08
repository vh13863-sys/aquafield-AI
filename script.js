// ==========================================
// AQUASHIELD AI - FRONTEND LOGIC
// ==========================================


// Smooth scroll
function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// EL NINO FORECAST
// ==========================================

function changeForecast() {

    const mode = document.getElementById("forecastSelect").value;

    const bars = document.querySelectorAll(".bars div");

    if (mode === "normal") {

        const values = [85, 78, 90, 82, 75, 88];

        bars.forEach((bar, index) => {
            bar.style.height = values[index] + "%";
        });

    }

    else if (mode === "elnino") {

        const values = [70, 55, 42, 50, 35, 46];

        bars.forEach((bar, index) => {
            bar.style.height = values[index] + "%";
        });

    }

    else {

        const values = [55, 42, 30, 38, 25, 32];

        bars.forEach((bar, index) => {
            bar.style.height = values[index] + "%";
        });

    }

}


// ==========================================
// WATER SECURITY SIMULATOR
// ==========================================

function updateSimulator() {

    const rainfall =
        Number(document.getElementById("rainfall").value);

    const demand =
        Number(document.getElementById("demand").value);

    const conservation =
        Number(document.getElementById("conservation").value);


    document.getElementById("rainValue").innerText =
        rainfall + "%";

    document.getElementById("demandValue").innerText =
        (demand >= 0 ? "+" : "") + demand + "%";

    document.getElementById("conservationValue").innerText =
        conservation + "%";


    /*
        Simple decision model:

        Lower rainfall  -> lower security
        Higher demand   -> lower security
        Conservation    -> higher security
    */

    let score = 70;

    score += rainfall * 0.45;

    score -= demand * 0.55;

    score += conservation * 0.65;


    score = Math.round(score);


    // Keep score between 0 and 100

    score = Math.max(0, Math.min(100, score));


    const scoreElement =
        document.getElementById("securityScore");

    const label =
        document.getElementById("scoreLabel");

    const message =
        document.getElementById("simulationMessage");


    scoreElement.innerText = score;


    if (score >= 75) {

        label.innerText = "HIGH SECURITY";

        label.style.color = "#16865b";

        message.innerText =
            "Current decisions provide a strong water-security buffer. Maintain conservation and monitor rainfall.";

    }

    else if (score >= 50) {

        label.innerText = "MODERATE SECURITY";

        label.style.color = "#b97800";

        message.innerText =
            "Water security is manageable, but conservation and rainfall harvesting should be increased.";

    }

    else {

        label.innerText = "HIGH RISK";

        label.style.color = "#d13b3b";

        message.innerText =
            "Immediate action is recommended. Reduce demand, increase water harvesting and protect critical reserves.";

    }

}


// ==========================================
// ACTION BUTTONS
// ==========================================

// ==========================================
// ACTION BUTTONS
// ==========================================

function takeAction(action) {

    fetch("http://localhost:5000/api/actions", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {

        console.log("Backend data:", data);
        console.log("Selected action:", action);

        const toast = document.getElementById("toast");

        toast.innerText =
            "✓ " + action + " action applied successfully";

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);

    })
    .catch(error => {

        console.error("Backend error:", error);

        const toast = document.getElementById("toast");

        toast.innerText =
            "⚠ Backend connection failed";

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);

    });
}




// ==========================================
// STARTUP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    updateSimulator();

    // Connect frontend to backend
    fetch("http://localhost:5000/api/dashboard")
        .then(response => response.json())
        .then(data => {
            console.log("Backend connected:", data);

            // Example: update water security on your dashboard
            const waterSecurity = document.querySelector("#water-security");

            if (waterSecurity && data.waterSecurity !== undefined) {
                waterSecurity.textContent = data.waterSecurity + "%";
            }
        })
        .catch(error => {
            console.error("Backend connection failed:", error);
        });

    console.log("AquaShield AI Dashboard initialized successfully.");
});