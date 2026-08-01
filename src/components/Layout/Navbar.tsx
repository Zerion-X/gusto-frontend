import {
  Search,
  Refrigerator,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/userStorage";

export default function Navbar() {
  const navigate = useNavigate();

  // const currentUser = getCurrentUser();

  const handleLogoClick = () => {
    navigate("/home");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleSearch = (recipe: string) => {
    navigate(`/search?query=${recipe}`);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#C47A2C]/10 bg-[#FFF8EA]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="group flex items-end gap-1"
        >
          <span className="font-['Cormorant_Garamond'] text-5xl font-semibold leading-none text-[#8B5A3C] transition-colors duration-300 group-hover:text-[#C47A2C]">
            G
          </span>

          <span className="pb-1 text-xl tracking-[0.35em] text-[#6D4C41] uppercase">
            usto
          </span>
        </button>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const recipe = (formData.get("recipe") as string)?.trim() || "";
            if (recipe) {
              handleSearch(recipe);
            }
          }}
          className="relative w-full max-w-xl mx-12"
        >
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]/90"
          />

          <input
            name="recipe"
            type="text"
            placeholder="Search recipes..."
            className="
              w-full
              rounded-full
              border
              border-[#C47A2C]/20
              bg-white/60
              py-3
              pl-11
              pr-12
              text-[#3A2419]
              placeholder:text-[#8B5A3C]/50
              backdrop-blur-md
              outline-none
              transition-all
              duration-300
              focus:border-[#C47A2C]
              focus:ring-4
              focus:ring-[#E59B1E]/20
            "
          />

          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5A3C]/70 transition-colors hover:text-[#C47A2C]"
          >
          </button>
        </form>

        {/* Right Icons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/fridge")}
            className="
              rounded-full
              border
              border-[#C47A2C]/20
              bg-white/60
              p-3
              text-[#8B5A3C]
              backdrop-blur-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#C47A2C]
              hover:text-[#C47A2C]
            "
          >
            <Refrigerator size={20} />
          </button>

          <button
            onClick={() => {
              const currentUser = getCurrentUser();

              if (currentUser) {
                navigate(`/profile/${currentUser.username}`);
              }
            }}
            className="
              rounded-full
              border
              border-[#C47A2C]/20
              bg-white/60
              p-3
              text-[#8B5A3C]
              backdrop-blur-md
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#C47A2C]
              hover:text-[#C47A2C]
            "
          >
            <UserRound size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
