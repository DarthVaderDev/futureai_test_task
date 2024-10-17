"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { auth } from "@/firebase/firebaseClient";
import { fetchUserRole } from "src/utiles/roleFetcher";
import { constMessage } from "src/utiles/constants/message.constant";

export const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const role = await fetchUserRole(user.uid);

      console.log("Role:", role);

      if (role) {
        Cookies.set("role", role, { expires: 1 });
        console.log("Redirecting to dashboard");
        router.push("/dashboard");
      } else {
        throw new Error("No user role found");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(constMessage.failedLogin);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}{" "}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded mt-4"
      >
        Login
      </button>
    </form>
  );
};
