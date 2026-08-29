const HeroRight = () => {
  return (
    <div className="relative">
      {/* Decorate Element */}
      <div className="absolute -top-4 -left-4 h-72 w-72 rotate-6 transform rounded-3xl bg-indigo-200 opacity-50"></div>
      <div className="absolute -right-4 -bottom-4 h-72 w-72 -rotate-6 transform rounded-3xl bg-purple-200 opacity-50"></div>

      {/* Main Illustration using css */}
      <div className="relative transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-105">
        <div className="space-y-4">
          <div className="flex h-64 items-end justify-center space-x-3">
            <div className="h-48 w-16 transform rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-lg transition-transform hover:-translate-y-2"></div>
            <div className="h-56 w-16 transform rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg transition-transform hover:-translate-y-2"></div>
            <div className="h-40 w-16 transform rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 shadow-lg transition-transform hover:-translate-y-2"></div>
            <div className="h-52 w-16 transform rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg transition-transform hover:-translate-y-2"></div>
          </div>

          {/* Floating Badge */}
          <div className="absolute top-4 right-4 animate-bounce rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-800 shadow-lg">
            📚 New Arrivals
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRight;
