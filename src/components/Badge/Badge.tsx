import { cva } from "class-variance-authority";

interface BadgeProps {
  title: string;
  intent?: "green" | "orange" | "default";
}
const BadgeVariant = cva("rounded p-0.5", {
  variants: {
    intent: {
      default: "bg-transparent text-black",
      orange: "bg-orange-500 border-orange-500 text-white",
      green: "bg-green-500 border-green-500 text-white",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});
function Badge({ title, intent, ...props }: BadgeProps) {
  return (
    <span className={BadgeVariant({ intent })} {...props}>
      {title}
    </span>
  );
}

export default Badge;
