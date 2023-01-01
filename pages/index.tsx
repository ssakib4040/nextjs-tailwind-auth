import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }, [router, session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-semibold">Protected Page</h2>
      {/* <button className="">Logout</button>  */}
      {/* create a button  */}
      <button
        className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-pink-500"
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </button>
    </div>
  );
}
