import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedBackground from "../components/Layout/AnimatedBackground";
import RecipeCard from "../components/Recipe/RecipeCard";
import { recipes } from "../data/recipes";
import {
  getLikedRecipeIds,
  getSavedRecipeIds,
} from "../utils/recipeInteractions";
import { getCurrentUser } from "../utils/userStorage";

type RecipeCollectionPageProps = {
  type: "favorites" | "saved";
};

export default function RecipeCollectionPage({
  type,
}: RecipeCollectionPageProps) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const likedRecipeIds = getLikedRecipeIds();
  const savedRecipeIds = getSavedRecipeIds();

  const isFavorites = type === "favorites";
  const recipeIds = isFavorites ? likedRecipeIds : savedRecipeIds;
  const heading = isFavorites ? "Favorite Recipes" : "Saved Recipes";
  const emptyMessage = isFavorites
    ? "You have not liked any recipes yet."
    : "You have not saved any recipes yet.";

  const visibleRecipes = recipes.filter((recipe) =>
    recipeIds.includes(recipe.id),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <button
          type="button"
          onClick={() =>
            navigate(currentUser ? `/profile/${currentUser.username}` : "/home")
          }
          className="mb-6 flex items-center gap-2 rounded-full border border-[#C47A2C]/30 bg-white/70 px-4 py-2 text-[#8B5A3C] transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to profile
        </button>

        <h1
          className="mb-8 text-5xl text-[#3A2419]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          {heading}
        </h1>

        {visibleRecipes.length === 0 ? (
          <div className="rounded-[28px] border border-white/40 bg-white/50 p-10 text-center shadow-2xl backdrop-blur-xl">
            <p className="text-lg text-[#8B5A3C]">{emptyMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
