import { useEffect } from "react";
import { useRouter } from "next/router";
import { checkSession } from "../lib/auth";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    async function verifyUser() {
      const user = await checkSession();

      if (!user) {
        router.replace("/login"); // Redirect to login if not authenticated
        return;
      }

      localStorage.setItem("role", user.role); // Store role for client-side use

      if (user.role === "admin" && router.pathname !== "/adminhomepage") {
        router.replace("/adminhomepage");
      } else if (user.role === "user" && router.pathname !== "/memberhomepage") {  // FIXED!
        router.replace("/memberhomepage");
      }
    }

    verifyUser();
  }, [router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
