import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f0e6] text-[#1f2937]">
      <h1 className="text-4xl md:text-5xl font-bold">
        Welcome to <span className="text-[#d97706]">Sail Family Tree</span>
      </h1>
      <p className="mt-3 text-lg md:text-xl">
        Preserving our history, one generation at a time.
      </p>
      <Link
        to="/tree"
        className="inline-block mt-8 rounded-2xl px-6 py-3 text-white bg-[#d97706] hover:bg-[#f59e0b] transition shadow"
      >
        View Family Tree
      </Link>
    </div>
  );
}
