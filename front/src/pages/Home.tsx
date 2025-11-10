import React, { useEffect } from "react";
import { API } from "../services/APIClient";
import { useKeycloak } from "@react-keycloak/web";

export const Home: React.FC = () => {

  const {keycloak} = useKeycloak();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) 
    {
      API.post("/auth/callback", {code})
      .then((res) =>
      {
        const data = res.data;

        if (data?.access_token) 
        {
            localStorage.setItem("access_token", data.access_token);
            console.log(localStorage.getItem("access_token"));

        }

      })
      .catch((err) => 
      {
        console.error("Erro ao autenticar:", err);
      });
    }
  }, []);

  const handleLogin = () => {
    const redirectUri = encodeURIComponent("http://localhost:3000/dashboard");
    const clientId = "user";
    const realm = "ProductManagement";
    const keycloakUrl = `http://localhost:8080/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
    window.location.href = keycloakUrl;

  };

  const handleLogout = async () => 
  {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) 
    {
      console.warn("Refresh Token não encontrado. Fazendo apenas limpeza local.");
      localStorage.removeItem("access_token");
      window.location.href = "/";
      return;
    }

    try 
    {
        await API.post("/auth/logout", { refreshToken: refreshToken }, { withCredentials: true }); 
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
    } 
    catch (err) 
    {

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm transition-all duration-300 hover:shadow-2xl">
        {!localStorage.getItem("access_token") ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Welcome to <span className="text-indigo-600">ShopSense</span>
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Sign in to access your product management system.
            </p>

            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-[1.02]"
            >
              Sign In with Keycloak
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Logged in successfully
            </h2>

            <div className="flex flex-col gap-3">
              <button
                onClick={() =>
                {
                  keycloak.login({redirectUri: window.location.origin + "/dashboard"} );

                }
                }
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition-transform hover:scale-[1.02]"
              >
                Go to Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-transform hover:scale-[1.02]"
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
