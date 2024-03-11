import Header from "../components/header";
import Standings from "../components/standings";

export default async function Home() {

  try {
    return (
      <main className="flex flex-col items-center justify-start p-4">
        <Header />
        <Standings />
      </main>
    );
  } catch (e) {
    console.error(e);
    return (
      <div>
        {JSON.stringify(e)}
      </div>
    )
  }
}
