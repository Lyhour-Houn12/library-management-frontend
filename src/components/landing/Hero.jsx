import { Link } from "react-router";
import AnimatedBackground from "../../Ui/AnimatedBackground";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HeroRight from "../../Ui/HeroRight";
import MouseScroll from "../../Ui/MouseScroll";
const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedBackground />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* LEFT COLUMN CONTENT */}
          <div className="animate-fade-in-up text-center lg:text-left">
            {/* BADGE */}
            <div className="animate-fade-in-up animation-delay-100 mb-4 inline-flex items-center space-x-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-800">
              <AutoAwesomeIcon sx={{ fontSize: 16 }} />
              <span>Welcome to Jing Library</span>
            </div>

            {/* MAIN HEADING */}
            <h1 className="animate-fade-in-up animation-delay-200 mb-6 text-4xl leading-tight font-black text-gray-900 sm:text-5xl lg:text-6xl">
              Your Gateway to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Endless Knowledge and Imagination
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="animate-fade-in-up animation-delay-400 mb-8 max-w-2xl text-lg text-gray-700">
              Discover, reserve, and enjoy a vast collection of books at your
              fingertips. Join our community of readers and embark on a journey
              of learning and exploration.
            </p>

            {/* CALL TO ACTION BUTTONS */}
            <div className="animate-fade-in-up animation-delay-600 flex flex-col justify-center gap-4 sm:flex-row sm:justify-start">
              <Link
                to="/books"
                className="group inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg"
              >
                <span>Explore Books</span>
                <ArrowForwardIcon
                  className="ml-2 transform transition-transform duration-200 group-hover:translate-x-1"
                  sx={{ fontSize: 20 }}
                />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-lg border border-indigo-600 px-6 py-3 text-lg font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50"
              >
                <MenuBookIcon sx={{ fontSize: 20, marginRight: "0.5rem" }} />
                <span>Log In</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="animate-fade-in-up animation-delay-800 mt-12 flex flex-wrap items-center justify-center gap-8 text-[16px] text-gray-600 lg:justify-start">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>10,000+ books</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>5,000+ books</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>24/7 Access</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN IMAGE */}
          <div className="animate-fade-in-up animate-delay-400 relative hidden lg:block">
            <HeroRight />
          </div>

          {/* Scrolling Indicator */}
          <MouseScroll />
        </div>
      </div>
    </section>
  );
};
                    
export default Hero;
