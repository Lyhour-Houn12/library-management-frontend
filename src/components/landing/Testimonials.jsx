import { testimonials } from "../../data/testimonials";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonials = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-fade-in-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            What Our Members{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Say
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Don't just take our word for it - hear from our community of
            passionate readers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-fade-in-up relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 transition-opacity group-hover:opacity-20">
                <FormatQuoteIcon sx={{ fontSize: 64, color: "#4F46E5" }} />
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} sx={{ fontSize: 20, color: "#FBBF24" }} />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="relative z-10 mb-6 leading-relaxed text-gray-700">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 text-2xl shadow-md`}
                >
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="animate-fade-in-up animation-delay-600 mt-16 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-12 text-center shadow-lg">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Join Our Community of Readers
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600">
            Become a member today and start your reading journey with access to
            thousands of books and exclusive benefits.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button className="transform rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl">
              Start Free Trial
            </button>
            <button className="rounded-xl border-2 border-indigo-600 bg-white px-8 py-4 font-semibold text-indigo-600 shadow-md transition-all duration-200 hover:bg-indigo-50 hover:shadow-lg">
              View Membership Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
