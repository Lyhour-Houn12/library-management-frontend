import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import PeopleIcon from "@mui/icons-material/People";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SecurityIcon from "@mui/icons-material/Security";

const features = [
  {
    icon: SearchIcon,
    title: "Smart Book Search",
    description:
      "Find your perfect book with our advanced search filters. Search by title, author, genre, or ISBN.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: EventIcon,
    title: "Online Reservation",
    description:
      "Reserve books online and pick them up at your convenience. Get instant notifications.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: PaymentIcon,
    title: "Secure Payments",
    description:
      "Integrated payment gateway for membership fees and fines. Multiple payment options available.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: PeopleIcon,
    title: "Digital Membership",
    description:
      "Manage your membership digitally. Track borrowed books, due dates, and reading history.",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: BookmarkIcon,
    title: "Personal Library",
    description:
      "Create your reading lists, save favorites, and get personalized recommendations.",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: SecurityIcon,
    title: "Secure & Private",
    description:
      "Your data is encrypted and secure. We respect your privacy and protect your information.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="animate-fade-in-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Jing Library
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Experience modern library management with cutting-edge features
            designed for book lovers
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group animate-fade-in-up relative rounded-2xl border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
              >
                {/* ICON */}
                <div
                  className={`inline-flex rounded-xl p-4 ${feature.bgColor} mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={feature.color} sx={{ fontSize: 32 }} />
                </div>

                <h3 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                  {feature.title}
                </h3>

                <p className="leading-relaxed text-gray-600">
                  {feature.description}
                </p>
                {/* HOVER EFFECT BORDER */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color.replace("text-", "from-")} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                ></div>
              </div>
            );
          })}
        </div>

        <div className="animate-fade-in-up animation-delay-600 mt-16 text-center">
          <p className="mb-6 text-lg text-gray-600">
            Ready to explore our features?
          </p>
          <button className="transform rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg duration-200 hover:-translate-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
