import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock3, ChefHat, Heart, Bookmark } from "lucide-react";
import { getRecipeById } from "../data/recipes";
import AnimatedBackground from "../components/Layout/AnimatedBackground";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFF8EA] px-6 text-center">
        <div className="rounded-[28px] border border-white/40 bg-white/50 p-10 shadow-2xl backdrop-blur-xl">
          <h1 className="mb-3 text-3xl text-[#3A2419]">Recipe not found</h1>
          <p className="mb-6 text-[#8B5A3C]">
            This recipe may have been removed or the link is invalid.
          </p>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="rounded-full bg-[#C47A2C] px-5 py-2 font-medium text-white transition hover:bg-[#a95f14]"
          >
            Back to Kitchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex w-fit items-center gap-2 rounded-full border border-[#C47A2C]/30 bg-white/70 px-4 py-2 text-[#8B5A3C] transition hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to recipes
        </button>

        <section className="overflow-hidden rounded-[32px] border border-white/40 bg-white/50 shadow-2xl backdrop-blur-xl">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative h-80 lg:h-full">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur">
                  {recipe.difficulty} • {recipe.time}
                </p>
                <h1
                  className="text-4xl text-white drop-shadow-lg sm:text-5xl"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}
                >
                  {recipe.name}
                </h1>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <p className="text-lg leading-8 text-[#8B5A3C]">
                {recipe.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-[#FFF3E3] px-4 py-2 text-[#C47A2C]">
                  <Heart size={18} fill="currentColor" />
                  <span>{recipe.likes}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#FFF3E3] px-4 py-2 text-[#C47A2C]">
                  <Bookmark size={18} fill="currentColor" />
                  <span>{recipe.saves}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#FFF3E3] px-4 py-2 text-[#C47A2C]">
                  <ChefHat size={18} />
                  <span>{recipe.author}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#FFF3E3] px-4 py-2 text-[#C47A2C]">
                  <Clock3 size={18} />
                  <span>{recipe.time}</span>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-3 text-2xl text-[#3A2419]">Ingredients</h2>
                  <ul className="space-y-2 text-[#8B5A3C]">
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient} className="flex items-start gap-2">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[#C47A2C]" />
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="mb-3 text-2xl text-[#3A2419]">Steps</h2>
                  <ol className="space-y-3 text-[#8B5A3C]">
                    {recipe.steps.map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C47A2C] text-sm font-semibold text-white">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
