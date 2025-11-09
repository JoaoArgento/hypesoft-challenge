import React from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  const { keycloak } = useKeycloak();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        {!keycloak.authenticated ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Welcome to ShopSense</h1>
            <p className="text-gray-600 text-center mb-6">
              Sign in to access your management product.
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">User</label>
              <input
                type="text"
                placeholder="Enter your user"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={() => keycloak.login()}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
            >
              Sign In
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Logged in as <span className="text-indigo-600">{keycloak.tokenParsed?.preferred_username}</span>
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                to="/dashboard"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Go to Dashboard
              </Link>

              <Link
                to="/admin"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Admin Area
              </Link>

              <button
                onClick={() => keycloak.logout({ redirectUri: window.location.origin })}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
