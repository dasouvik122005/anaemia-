function generateReport() {
    const hb = parseFloat(document.getElementById('hbValue').value);
    const minHb = 5;
    const maxHb = 15;

    if (isNaN(hb)) return alert("Please enter a valid number");

    // 1. Calculate normalized position (0 to 1)
    let t = (hb - minHb) / (maxHb - minHb);
    t = Math.max(0, Math.min(1, t));

    // 2. Get the RGB Color (Interpolation)
    const color = getInterpolatedColor(t);
    
    // 3. Update UI
    const resultBox = document.getElementById('resultBox');
    const diagnosisText = document.getElementById('diagnosisText');
    const reportSection = document.getElementById('reportSection');

    resultBox.style.backgroundColor = color;
    reportSection.style.display = 'block';

    // Clinical Logic (NFHS-5 Standards)
    if (hb < 7) {
        diagnosisText.innerText = `Status: Severe Anaemia (${hb} g/dL)`;
        diagnosisText.style.color = "red";
    } else if (hb < 10) {
        diagnosisText.innerText = `Status: Moderate Anaemia (${hb} g/dL)`;
        diagnosisText.style.color = "orange";
    } else if (hb < 12) {
        diagnosisText.innerText = `Status: Mild Anaemia (${hb} g/dL)`;
        diagnosisText.style.color = "#cccc00";
    } else {
        diagnosisText.innerText = `Status: Normal (${hb} g/dL)`;
        diagnosisText.style.color = "green";
    }
}

function getInterpolatedColor(t) {
    // MATLAB base = [1 0 0; 1 1 0; 0 0.7 0]
    let r, g, b;
    if (t <= 0.5) {
        // Between Red (255,0,0) and Yellow (255,255,0)
        let localT = t / 0.5;
        r = 255;
        g = Math.round(255 * localT);
        b = 0;
    } else {
        // Between Yellow (255,255,0) and Green (0,179,0)
        let localT = (t - 0.5) / 0.5;
        r = Math.round(255 * (1 - localT));
        g = Math.round(255 - (76 * localT)); // Slopes down to 179 (0.7 * 255)
        b = 0;
    }
    return `rgb(${r}, ${g}, ${b})`;
}