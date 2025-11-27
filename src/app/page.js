import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold">Hello world!</h1>
      {
        JSON.stringify(session)
      }
    </div>
  );
}
