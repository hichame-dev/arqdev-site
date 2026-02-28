import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import CursorGlow from "@/components/CursorGlow";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <CursorGlow />
      <Navbar />
      <Hero />
      <Stats />
      <Projects />
      <TechMarquee />
      <Services />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  );
}
