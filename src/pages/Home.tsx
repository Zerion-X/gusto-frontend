import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/Layout/AnimatedBackground";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AnimatedBackground />
        <Navbar />

        <main className="flex-1">...</main>

        <Footer />
      </div>
    </>
  );
}
