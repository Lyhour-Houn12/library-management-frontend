import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import Navbar from "../components/landing/Navbar";
import Stats from "../components/landing/Stats";
import Testimonials from "../components/landing/Testimonials";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <Testimonials />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
