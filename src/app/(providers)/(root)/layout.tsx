import Lazy from "@/components/Lazy";
import { PropsWithChildren, Suspense } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <div id="root">
      <Suspense fallback={<Lazy />}>{children}</Suspense>
    </div>
  );
}

export default RootLayout;
