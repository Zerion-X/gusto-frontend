import AnimatedBackground from "../components/Layout/AnimatedBackground";
import RecipeCard from "../components/Recipe/RecipeCard";
import { recipes } from "../data/recipes";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        <h1
          className="mb-10 text-6xl text-[#3A2419]"
          style={{ fontFamily: "Cormorant Garamond, serif" }}
        >
          Recipes
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}
