import { type IFormField } from "../core/interfaces/IFormField";

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
}: IFormField) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#8B5A3C]"
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-[#3A2419] placeholder:text-[#8B5A3C]/50 backdrop-blur-md outline-none transition-all duration-300 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200"
            : "border-[#C47A2C]/20 focus:border-[#C47A2C] focus:ring-4 focus:ring-[#E59B1E]/20"
        }`}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
}