import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Capabilities from "@/components/sections/Capabilities";
import MapShowcase from "@/components/sections/MapShowcase";
import Apps from "@/components/sections/Apps";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ChatBot from "@/components/ui/ChatBot";

export default function Home() {
  return (
    <main>
      <Hero />
      <Process />
      <Capabilities />
      <MapShowcase />
      <Apps />
      <About />
      <Contact />
      <Footer />
      <ChatBot />
    </main>
  );
}
