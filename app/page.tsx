import Navbar from "@/components/Navbar";
import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] from-30% to-[#334F90] to-100%">
      <Navbar />
      <TaskList></TaskList>
    </div>
  );
}
