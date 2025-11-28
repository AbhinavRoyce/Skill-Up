import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="font-semibold text-lg">SkillUp JobPortal</span>
      </div>
      <nav className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <button
              onClick={onLogout}
              className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-gray-700">
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm px-4 py-2 rounded-lg bg-indigo-600 text-white"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
