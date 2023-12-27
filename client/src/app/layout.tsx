import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

const jostFont = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brasileirão Guessr",
  description:
    "Acerte o time que ficou nas colocações de diversas edições do Brasileirão",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={jostFont.className}>{children}</body>
    </html>
  );
}
