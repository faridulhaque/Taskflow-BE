import Navbar from "@/components/Navbar";
import SignIn from "@/components/SignIn";

function page() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar />
      <SignIn></SignIn>
    </div>
  );
}

export default page;
