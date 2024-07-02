import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return <div id="root">{children}</div>;
}

export default RootLayout;
