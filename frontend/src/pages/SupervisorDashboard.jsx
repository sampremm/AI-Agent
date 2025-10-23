import HelpRequestList from "../components/HelpRequestList";
import LearnedAnswers from "../components/LearnedAnswers";

export default function SupervisorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-8 items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">Supervisor Dashboard 🧠</h1>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        <HelpRequestList />
        <LearnedAnswers />
      </div>
    </div>
  );
}
