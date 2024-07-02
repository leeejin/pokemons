import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps } from "react";

type ButtonProps = ButtonVariantProps & ComponentProps<"button">;
type ButtonVariantProps = VariantProps<typeof buttonVariant>;
const buttonVariant = cva(
  "rounded border font-semibold hover:brightness-90 active:brightness-75",
  {
    variants: {
      intent: {
        primary: "bg-blue-500  border-blue-500",
        danger: "bg-red-500 border-red-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-[15px]",
        lg: "px-5 py-2.5 text-[17px]",
      },
      outline: {
        true: "bg-white",
        false: "text-white",
      },
    },
    compoundVariants: [
      { intent: "primary", outline: true, className: "text-blue-500" },
      { intent: "danger", outline: true, className: "text-red-500" },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      outline: false,
    },
  }
);
function Button({ intent, size, outline, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariant({ intent, size, outline })} {...props}>
      {children}
    </button>
  );
}

export default Button;
