# 🤖 AI Voice Agent — Human-in-the-Loop Receptionist

A **full-stack intelligent receptionist** built using **LiveKit**, **OpenAI**, **Node.js**, and **React.js**.  
This agent can **talk to users in real time**, handle salon-related queries, and **escalate unknown requests** to a human supervisor —  
creating a **Human-in-the-Loop AI system**.

---

## 🧠 Overview

This project demonstrates a **Human-in-the-Loop AI architecture** for a virtual salon receptionist:

- 🎙️ **LiveKit Integration** — Enables real-time voice conversations between customers and the AI agent.
- 🤖 **OpenAI Chat Model** — Provides natural, human-like responses.
- 🧾 **MongoDB Storage** — Escalated queries are logged as “Help Requests” for supervisors.
- 🧩 **React Frontend** — Allows supervisors to view pending and learned queries.
- 🔄 **Node.js Backend** — Handles LiveKit token generation, AI responses, and database operations.

---

## 🚀 Tech Stack

### **Frontend**
- ⚛️ React.js (Vite)
- 💨 TailwindCSS
- 🔊 LiveKit Client SDK

### **Backend**
- 🟢 Node.js + Express.js
- 🧠 OpenAI API (GPT-4o-mini)
- ☁️ LiveKit Cloud SDK
- 🍃 MongoDB + Mongoose

---

## 📂 Project Structure

```

AI-Voice-Agent/
├── Backend/
│   ├── models/
│   │   └── HelpRequest.js
│   ├── routes/
│   │   └── livekitRoutes.js
│   ├── services/
│   │   └── aiAgent.js
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HelpRequestList.jsx
│   │   │   └── LearnedAnswers.jsx
│   │   ├── pages/
│   │   │   └── SupervisorDashboard.jsx
│   │   ├── VoiceChat.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   └── .env
│
└── README.md

````

---

## ⚙️ Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/ai-voice-agent.git
cd ai-voice-agent
````

---

### **2️⃣ Setup the Backend**

```bash
cd Backend
npm install
```

#### Create a `.env` file

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
LIVEKIT_URL=wss://your-livekit-domain.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

#### Run the Backend

```bash
npm run dev
```

✅ You should see:

```
✅ MongoDB connected
🚀 Server running on port 3000
🤖 Starting LiveKit AI Agent...
```

---

### **3️⃣ Setup the Frontend**

```bash
cd ../frontend
npm install
```

#### Create a `.env` file

```env
VITE_API_URL=http://localhost:3000
VITE_LIVEKIT_URL=wss://your-livekit-domain.livekit.cloud
```

#### Start the Frontend

```bash
npm run dev
```

✅ Your app will start at:

```
http://localhost:5173
```

---

## 🧩 Features

### 👩‍💼 AI Receptionist

* Greets customers and answers salon-related queries.
* Handles FAQs (facials, hair spa, timings, etc.).
* Uses GPT-4o-mini for fast and natural responses.

### 🧑‍💻 Human-in-the-Loop Escalation

* If AI is unsure, it escalates with:

  ```
  "Let me check with my supervisor and get back to you."
  ```
* Automatically saves the query in MongoDB (`HelpRequests` collection).

### 🗂️ Supervisor Dashboard

* View **pending help requests**
* Review **AI-learned responses**
* Manage AI feedback and training

### 🎧 Voice Integration

* Connects to LiveKit rooms for **real-time voice interaction**
* Secure token generation with JWT via Express

---

## 🧠 Example Flow

1. User says:
   *“Do you offer facials?”*

2. AI replies using OpenAI API:
   *“Yes, we do offer a range of facials depending on your skin type.”*

3. If the AI doesn’t know, it says:
   *“Let me check with my supervisor and get back to you.”*

4. That query is logged in MongoDB → visible in Supervisor Dashboard.

---

## 📸 Frontend Preview

| Page                        | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| 🎙️ **VoiceChat**           | Connects to the salon room on LiveKit and starts talking |
| 🧾 **Supervisor Dashboard** | Lists pending queries and learned responses              |

---

## 🔒 Security Notes

* Never commit your `.env` file — it contains sensitive API keys.
* Make sure your MongoDB and LiveKit keys are secured.
* `.gitignore` already excludes secrets from commits.

---

## 🧰 Future Enhancements

* 🗣️ Add text-to-speech and speech-to-text integration
* 📞 Enable phone-based call bridging with LiveKit SIP
* 💬 Add chat mode for web support
* 📊 Add analytics for user queries and AI accuracy

---

