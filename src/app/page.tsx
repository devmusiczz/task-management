import { getServerSession } from "next-auth";
const  Home =    async () => {
  const session = await getServerSession();
  console.log(session);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home Page</h1>
    </main>
  );
}

export default Home;