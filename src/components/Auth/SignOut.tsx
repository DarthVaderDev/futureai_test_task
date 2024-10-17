"use client";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebaseClient";
import Cookies from "js-cookie";

export const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();

      Cookies.remove("role");

      router.replace("/auth");

      setTimeout(() => {
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", () => {
          window.location.href = "/auth";
        });
      }, 200);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
    >
      Sign Out
    </button>
  );
};
