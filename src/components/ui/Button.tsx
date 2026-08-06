type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "outline";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-[20px] transition-all duration-300 font-medium";

  const variants = {
    primary:
      "bg-sky-400 text-black hover:bg-sky-300",
    outline:
      "border border-white text-white hover:bg-white hover:text-black",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`}>
      {children}
    </button>
  );
}