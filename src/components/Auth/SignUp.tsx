'use client';

import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { auth, firestore } from '@/firebase/firebaseClient';
import Cookies from 'js-cookie';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), { role });
      Cookies.set('role', role, { expires: 1 });

      alert('Signing in successful, please check your email!');
      await sendEmailVerification(user);
      setMessage('Verification email sent. Check your inbox.');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
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
      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="user">User</option>
          <option value="merchant">Merchant</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded mt-4"
      >
        Sign Up
      </button>
    </form>
  );
};
