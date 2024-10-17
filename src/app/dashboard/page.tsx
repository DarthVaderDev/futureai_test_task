"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");

    if (role === "merchant") {
      router.push("/dashboard/merchant");
    } else if (role === "user") {
      router.push("/dashboard/user");
    } else {
      router.push("/auth");
    }
  }, [router]);

  return (
    <div>
      <h1>Redirecting to your dashboard...</h1>
    </div>
  );
}
