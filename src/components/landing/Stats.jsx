import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StatsGrid from "../../Ui/StatsGrid";

const stats = [
  {
    icon: MenuBookIcon,
    value: 10000,
    suffix: "+",
    label: "Books Available",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: PeopleIcon,
    value: 5000,
    suffix: "+",
    label: "Active Members",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: EmojiEventsIcon,
    value: 50,
    suffix: "+",
    label: "Award Winning",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: TrendingUpIcon,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
];

const Stats = () => {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="animate-fade-in-up mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Our Impact in <span>Numbers</span>
          </h2>
          <p className="max-3-xl mx-auto text-lg text-gray-600">
            Join thousands of satisfied readers who trust Jing Library for their
            reading journey
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <StatsGrid key={i} stat={stat} Icon={stat.icon} index={i} />
          ))}
        </div>

        <div className="animate-fade-in-up animation-delay-600 mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:flex-row">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-400 to-purple-600 text-sm font-bold text-white"
                >
                  {i === 4 ? "+" : "🧑‍🎓"}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold">1,200+</p>
              <p className="text-gray-600">New members joined this month.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
