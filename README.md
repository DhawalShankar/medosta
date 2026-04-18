Here's your README for Medosta:

---

# Medosta 🩺

**Plain language medical reports — powered by Gemini AI**

Built at GDG Vibecode Hackathon by Team Antigravity

---

## What is Medosta?

Patients receive lab reports full of numbers and medical terms they don't understand. Medosta fixes that — paste your report, get a simple explanation and risk flags in seconds.

---

## How to Run

```bash
git clone https://github.com/your-team/medosta
cd medosta
npm install
npm run dev
```

Add your Gemini API key in a `.env` file:

```
GEMINI_API_KEY=your_key_here
```

---

## How the AI Works

Medosta sends your lab report to the **Gemini API** with a structured prompt that asks it to return:

- A plain-English summary of your results
- A risk level for each value (`normal`, `warning`, `critical`)
- Simple next steps to take

```js
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  }
);
```

---

## Project Structure

```
medosta/
├── index.html
├── src/
│   ├── App.jsx
│   ├── api.js          ← Gemini API call lives here
│   └── components/
│       ├── ReportInput.jsx
│       ├── Summary.jsx
│       └── FlagCard.jsx
└── .env
```

---

## Risk Flags

| Level | Meaning |
|-------|---------|
| 🟢 Normal | You're good |
| 🟡 Warning | Worth monitoring |
| 🔴 Critical | See a doctor soon |

---

## Disclaimer

Medosta is not a medical device. Always consult a real doctor for diagnosis and treatment.

---

*Team Antigravity — GDG Vibecode 2026*