import { ChevronTop } from "lucide-react";

export default function ScrollToTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      }}
      className="fixed bottom-20 right-6 z-50 size-13 bg-[#1a2340] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#243060] active:scale-95 transition-all select-none cursor-pointer border border-gray-200"
      aria-label="Volver arriba"
    >
      <ChevronTop className=" size-7" />
    </button>
  );
}
