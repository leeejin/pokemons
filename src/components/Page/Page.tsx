import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

interface PageProps {
  title: string;
  isTitleHidden?: boolean;
  width?: "sm" | "md" | "full";
}
const pageVariant = cva(
  "container mx-auto max-w-[1024px] min-h-screen px-5 py-20 bg-black text-white",
  {
    variants: {
      width: {
        sm: "max-w-[620px]",
        md: "max-w-[1024px]",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      width: "md",
    },
  }
);
function Page({
  title,
  isTitleHidden = false,
  width,
  children,
}: PropsWithChildren<PageProps>) {
  return (
    <main className={pageVariant({ width })}>
      <h1
        className={
          "text-3xl font-bold text-center mb-4" +
          (isTitleHidden ? " hidden" : "")
        }
      >
        {title}
      </h1>
      {children}
    </main>
  );
}

export default Page;
