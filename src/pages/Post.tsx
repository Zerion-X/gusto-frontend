import ImageUploadBox from "../components/AddImage";
import { useState, type FormEvent } from "react";

export default function AddPost() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !steps.trim() || !imageFile) {
      setStatusMessage("Please fill in the title, description, steps, and add an image.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("steps", steps.trim());
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:4200/api/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to publish post.");
      }

      setStatusMessage("Post published successfully!");
      setTitle("");
      setDescription("");
      setSteps("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setStatusMessage("Something went wrong while publishing your post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[36px] border border-white/50 bg-white/70 p-6 shadow-[0_25px_80px_rgba(139,90,60,0.12)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div className="rounded-[30px] border border-[#C47A2C]/15 bg-[#FFF8EA]/70 p-4 sm:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B5A3C]/70">
                Create Post
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#3A2419] sm:text-4xl">
                Share your next favorite recipe
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#6D4C41]/90">
                Add a warm, appetizing image and describe the dish in a way that feels polished and inviting.
              </p>
            </div>

            <ImageUploadBox onImageSelect={(file) => setImageFile(file)} />
          </div>

          <div className="flex flex-col justify-center rounded-[30px] border border-[#C47A2C]/15 bg-white/70 p-6 shadow-sm sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5A3C]">
                  Title
                </label>
                <input
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title..."
                  required
                  className="w-full rounded-full border border-[#C47A2C]/20 bg-white/60 px-4 py-3 text-[#3A2419] placeholder:text-[#8B5A3C]/50 outline-none transition-all duration-300 focus:border-[#C47A2C] focus:ring-4 focus:ring-[#E59B1E]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5A3C]">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people what makes this dish special..."
                  required
                  className="w-full resize-none rounded-[20px] border border-[#C47A2C]/20 bg-white/60 px-4 py-3 text-[#3A2419] placeholder:text-[#8B5A3C]/50 outline-none transition-all duration-300 focus:border-[#C47A2C] focus:ring-4 focus:ring-[#E59B1E]/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.2em] text-[#8B5A3C]">
                  Steps
                </label>
                <textarea
                  name="steps"
                  rows={15}
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  placeholder="Walk us through the steps of preparing your dish…"
                  required
                  className="w-full resize-none rounded-[20px] border border-[#C47A2C]/20 bg-white/60 px-4 py-3 text-[#3A2419] placeholder:text-[#8B5A3C]/50 outline-none transition-all duration-300 focus:border-[#C47A2C] focus:ring-4 focus:ring-[#E59B1E]/20"
                />
              </div>

              {statusMessage ? (
                <p className="text-sm text-[#8B5A3C]">{statusMessage}</p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#C47A2C] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8B5A3C] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}