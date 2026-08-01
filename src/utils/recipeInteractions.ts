import { getCurrentUser } from "./userStorage";

const STORAGE_KEY = "gusto-recipe-interactions";

type RecipeInteractions = {
  likedRecipeIds: number[];
  savedRecipeIds: number[];
};

type UserInteractionsMap = Record<string, RecipeInteractions>;

function getUserKey() {
  return getCurrentUser()?.username ?? "guest";
}

function readInteractions(): RecipeInteractions {
  if (typeof window === "undefined") {
    return { likedRecipeIds: [], savedRecipeIds: [] };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { likedRecipeIds: [], savedRecipeIds: [] };
    }

    const parsed = JSON.parse(raw) as UserInteractionsMap;
    const userKey = getUserKey();

    return parsed[userKey] ?? { likedRecipeIds: [], savedRecipeIds: [] };
  } catch {
    return { likedRecipeIds: [], savedRecipeIds: [] };
  }
}

function writeInteractions(interactions: RecipeInteractions) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: UserInteractionsMap = raw ? JSON.parse(raw) : {};
    parsed[getUserKey()] = interactions;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // Ignore storage write errors in this demo app.
  }
}

export function isRecipeLiked(recipeId: number) {
  return readInteractions().likedRecipeIds.includes(recipeId);
}

export function isRecipeSaved(recipeId: number) {
  return readInteractions().savedRecipeIds.includes(recipeId);
}

export function getLikedRecipeIds() {
  return readInteractions().likedRecipeIds;
}

export function getSavedRecipeIds() {
  return readInteractions().savedRecipeIds;
}

export function toggleRecipeLike(recipeId: number) {
  const interactions = readInteractions();
  const isLiked = interactions.likedRecipeIds.includes(recipeId);

  if (isLiked) {
    interactions.likedRecipeIds = interactions.likedRecipeIds.filter(
      (id) => id !== recipeId,
    );
  } else {
    interactions.likedRecipeIds = [...interactions.likedRecipeIds, recipeId];
  }

  writeInteractions(interactions);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("gusto-recipe-interactions-changed"));
  }

  return !isLiked;
}

export function toggleRecipeSave(recipeId: number) {
  const interactions = readInteractions();
  const isSaved = interactions.savedRecipeIds.includes(recipeId);

  if (isSaved) {
    interactions.savedRecipeIds = interactions.savedRecipeIds.filter(
      (id) => id !== recipeId,
    );
  } else {
    interactions.savedRecipeIds = [...interactions.savedRecipeIds, recipeId];
  }

  writeInteractions(interactions);

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("gusto-recipe-interactions-changed"));
  }

  return !isSaved;
}
