import { motion } from "framer-motion";
import { Heart, Pencil, Trash2 } from "lucide-react";

type PostCardProps = {
  title: string;
  description: string;
  likes: number;
  createdAt: string;
};

export default function PostCard({
  title,
  description,
  likes,
  createdAt,
}: PostCardProps) {
  return (
    <motion.article
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        rounded-3xl
        border
        border-white/40
        bg-white/30
        p-6
        shadow-xl
        backdrop-blur-xl
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold text-[#3A2419]">{title}</h3>

          <p className="mt-3 text-[#8B5A3C]">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-[#C47A2C]/20 bg-white/60 p-2 text-[#8B5A3C] transition hover:border-[#C47A2C] hover:text-[#C47A2C]"
            aria-label="Edit post"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            className="rounded-full border border-[#C47A2C]/20 bg-white/60 p-2 text-[#8B5A3C] transition hover:border-[#C47A2C] hover:text-[#C47A2C]"
            aria-label="Delete post"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm text-[#8B5A3C]/80">
        <span className="flex items-center gap-2">
          <Heart size={16} /> {likes}
        </span>

        <span className="ml-auto">{createdAt}</span>
      </div>
    </motion.article>
  );
}
