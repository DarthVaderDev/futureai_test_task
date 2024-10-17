"use client";

import { useState } from "react";
import { SignIn } from "src/components/Auth/SignIn";
import { SignUp } from "src/components/Auth/SignUp";

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-70">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        {isLogin ? <SignIn /> : <SignUp />}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            className="text-sm text-blue-500"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};
