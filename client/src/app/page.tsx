import SearchInput from "./components/search-input";

export default async function Home() {
  const response = await fetch(process.env.DAY_GAME_ENDPOINT || "");
  const result = await response.json();

  return (
    <main className="flex justify-center h-screen">
      <section className="h-screen w-full md:w-[34rem] py-8 px-4 md:px-0">
        <h1 className="text-3xl font-medium text-center">
          ⚽ Brasileirão Guessr
        </h1>

        <SearchInput teams={result.all_teams} />
      </section>
    </main>
  );
}
