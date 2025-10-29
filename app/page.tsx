import Navbar from "@/components/Navbar";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <TaskList></TaskList>
    </div>
  );
}
