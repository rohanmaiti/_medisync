import { Navbar } from "../components/Navbar";
import { AboutSection } from "./sections/AboutPage";
import { HomeSection } from "./sections/HomeSection";
import { ServiceSection } from "./sections/ServiceSection";

export const LandingPage = () => {
  return (
    <div className="h-screen overflow-y-auto scroll-smooth">
       <div className="fixed w-full ">
       <Navbar />
      </div>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center bg-slate-600 pt-20 text-black"
      >
        <HomeSection />
      </section>

      <section
        id="services"
        className="min-h-screen flex items-center justify-center bg-slate-700 pt-20 text-black "
      >
        <ServiceSection />
      </section>
      <section id="about" className="min-h-screen bg-slate-800 pt-20">
        <AboutSection />
      </section>
    </div>
  );
};
