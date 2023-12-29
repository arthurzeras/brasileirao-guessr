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
      <body className={jostFont.className}>
        <main className="flex justify-center h-screen">
          <section className="flex flex-col gap-4 h-screen w-full md:w-[34rem] py-8 px-4 md:px-0">
            <h1 className="text-3xl font-medium text-center">
              ⚽ Brasileirão Guessr
            </h1>

            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
