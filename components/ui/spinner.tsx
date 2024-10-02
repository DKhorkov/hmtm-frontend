const Spinner = () => (
  <div className="relative">
    <div className="h-8 w-8 rounded-full border-4 border-gray-300 dark:text-white" />
    <div className="absolute top-0 left-0 animate-spin  h-8 w-8 rounded-full border-4  border-transparent border-l-black  dark:text-white" />
  </div>
);

export { Spinner };
