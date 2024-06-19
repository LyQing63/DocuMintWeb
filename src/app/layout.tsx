import "@/styles/globals.css";
import "@/styles/prosemirror.css";

import type {Metadata, Viewport} from "next";
import type {ReactNode} from "react";
import Providers from "./providers";
import {Toaster} from "@/components/tailwind/ui/toaster";

const title = "DocMint：智能编辑，精雕细琢";
const description =
    "智能编辑新时代，DocMint为你引路";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@steventey",
  },
  metadataBase: new URL("https://novel.sh"),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body>
      <Providers>{children}</Providers>
      <Toaster/>
      </body>
      </html>
  );
}
