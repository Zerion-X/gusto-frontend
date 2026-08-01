import { useEffect, useState } from "react";
import AnimatedBackground from "../components/Layout/AnimatedBackground";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStat from "../components/Profile/ProfileStats";
import PostCard from "../components/Profile/ProfilePostCard";
import { Navigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../utils/userStorage";
import {
  getLikedPostIds,
  getLikedRecipeIds,
  getSavedPostIds,
  getSavedRecipeIds,
} from "../utils/recipeInteractions";
import { getPostsByUser } from "../utils/postStorage";

export default function UserManagement() {
  const currentUser = getCurrentUser();
  const { username } = useParams();
  const [likedCount, setLikedCount] = useState(
    getLikedRecipeIds().length + getLikedPostIds().length,
  );
  const [savedCount, setSavedCount] = useState(
    getSavedRecipeIds().length + getSavedPostIds().length,
  );
  const [posts, setPosts] = useState(() =>
    currentUser ? getPostsByUser(currentUser.username) : [],
  );

  useEffect(() => {
    const syncCounts = () => {
      setLikedCount(getLikedRecipeIds().length + getLikedPostIds().length);
      setSavedCount(getSavedRecipeIds().length + getSavedPostIds().length);
    };

    const syncPosts = () => {
      setPosts(currentUser ? getPostsByUser(currentUser.username) : []);
    };

    syncCounts();
    syncPosts();
    window.addEventListener("gusto-recipe-interactions-changed", syncCounts);
    window.addEventListener("gusto-posts-changed", syncPosts);

    return () => {
      window.removeEventListener(
        "gusto-recipe-interactions-changed",
        syncCounts,
      );
      window.removeEventListener("gusto-posts-changed", syncPosts);
    };
  }, [currentUser]);

  const stats = [
    {
      title: "Posts",
      value: posts.length,
      route: undefined,
    },
    {
      title: "Favorites",
      value: likedCount,
      route: "/profile/favorites",
    },
    {
      title: "Saved Recipes",
      value: savedCount,
      route: "/profile/saved",
    },
  ];

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!username || username !== currentUser.username) {
    return <Navigate to={`/profile/${currentUser.username}`} replace />;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FFF8EA]">
      <AnimatedBackground />

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <ProfileHeader
          username={currentUser.username}
          email={currentUser.email}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <ProfileStat
              key={stat.title}
              title={stat.title}
              value={stat.value}
              route={stat.route}
            />
          ))}
        </div>

        <section className="mt-16">
          <h2
            className="mb-6 text-4xl text-[#3A2419]"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            My Posts
          </h2>

          <div className="space-y-6">
            {posts.length === 0 ? (
              <div className="rounded-3xl border border-white/40 bg-white/30 p-6 text-[#8B5A3C] shadow-xl backdrop-blur-xl">
                You have not posted anything yet.
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  description={post.description}
                  likes={post.likes}
                  createdAt={post.createdAt}
                />
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
