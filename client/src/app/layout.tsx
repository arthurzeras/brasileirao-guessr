import Link from "next/link";
import type { Metadata } from "next";
import { Jost } from "next/font/google";

import "./globals.css";
import NextGame from "../components/next-game";
import HeadButtons from "../components/head-buttons";

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
      <body className={jostFont.className}>
        <main className="flex justify-center h-screen">
          <section className="layout-section">
            <HeadButtons />
            <h1 className="text-3xl font-medium text-center mt-4 md:mt-0">
              <Link href="/">⚽ Brasileirão Guessr </Link>
            </h1>

            {children}

            <NextGame />

            <Link href="/previous-games" className="link-primary">
              Jogos anteriores
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
