import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import VoiceChat from "./components/VoiceChat";

function App() {
  return (
    <Router>
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <h1 className="font-bold text-lg">Salon AI</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/voice" className="hover:text-blue-400">Voice Chat</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<SupervisorDashboard />} />
        <Route path="/voice" element={<VoiceChat />} />
      </Routes>
    </Router>
  );
}

export default App;
