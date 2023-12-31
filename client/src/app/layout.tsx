import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import HeadButtons from "./components/head-buttons";

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
        <main className="flex justify-center h-screen overflow-y-auto">
          <section className="flex flex-col gap-4 h-screen w-full md:w-[34rem] py-8 px-4 md:px-0 relative">
            <HeadButtons />
            <h1 className="text-3xl font-medium text-center mt-4 md:mt-0">
              <Link href="/">⚽ Brasileirão Guessr </Link>
            </h1>

            {children}

            <Link href="/previous-games" className="link-primary">
              Jogos anteriores
            </Link>
          </section>
        </main>
      </body>
    </html>
  );
}
