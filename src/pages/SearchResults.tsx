import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import AnimatedBackground from "../components/Layout/AnimatedBackground";
import RecipeCard, {
  type RecipeCardProps,
} from "../components/Recipe/RecipeCard";
import { recipes as defaultRecipes } from "../data/recipes";
import { getPosts } from "../utils/postStorage";

const recipes: RecipeCardProps[] = defaultRecipes.map((recipe) => ({
  ...recipe,
  kind: "recipe" as const,
}));

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() ?? "";

  const searchableItems = useMemo(() => {
    const posts = getPosts().map((post) => ({
      id: post.id,
      image: post.image,
      name: post.title,
      summary: post.description,
      likes: post.likes,
      saves: post.saves,
      kind: "post" as const,
    }));

    return [...recipes, ...posts];
  }, []);

  const filteredRecipes = useMemo(
    () =>
      query
        ? searchableItems.filter((item) =>
            [item.name, item.summary]
              .join(" ")
              .toLowerCase()
              .includes(query.toLowerCase()),
          )
        : [],
    [query, searchableItems],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <main className="relative z-10 mx-auto max-w-7xl px-8 py-12">
        {query ? (
          filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={`${recipe.kind}-${recipe.id}`} {...recipe} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#C47A2C]/20 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-xl">
              <p className="text-xl font-semibold text-[#8B5A3C]">
                No recipes found
              </p>
              <p className="mt-3 text-[#6D4C41]/90">
                Try a different keyword or broaden your search to find recipes
                that match.
              </p>
            </div>
          )
        ) : (
          <div className="rounded-[28px] border border-[#C47A2C]/20 bg-white/80 p-12 text-center shadow-2xl backdrop-blur-xl">
            <p className="text-xl font-semibold text-[#8B5A3C]">
              Ready to search?
            </p>
            <p className="mt-3 text-[#6D4C41]/90">
              Use the search bar above to explore recipes, ingredients, and
              cuisine ideas.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
