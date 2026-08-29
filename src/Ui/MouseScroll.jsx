const MouseScroll = () => {
  return (
    <div className="animate-fade-in-up animation-delay-1000 absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block">
      <div className="animate-bounce">
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-indigo-600">
          <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-indigo-600"></div>
        </div>
      </div>
    </div>
  );
};

export default MouseScroll;
