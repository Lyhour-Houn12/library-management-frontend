import { useEffect, useState } from "react";

const StatsGrid = ({ stat, Icon, index }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const duration = 2000;
          const steps = 200;
          const increment = stat.value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= stat.value) {
              setCount(stat.value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 },
    );
    const element = document.getElementById(`stat-${index}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, stat.value, index]);

  return (
    <div
      id={`stat-${index}`}
      className="group animate-fade-in-up relative rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* ICON */}
      <div
        className={`inline-flex rounded-xl p-4 ${stat.bgColor} mb-6 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className={stat.icon} sx={{ fontSize: 32 }} />
      </div>

      {/* VALUE */}
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">
          {count.toLocaleString()}
        </span>
        <span className={`text-4xl font-bold ${stat.color}`}>
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="font-medium text-gray-600">{stat.label}</p>

      {/* Hover Effect Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color.replace("text-", "from-")} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      ></div>
    </div>
  );
};

export default StatsGrid;
