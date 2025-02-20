// Dont forgot,
// Download Tailwindcss or add <script src="https://cdn.tailwindcss.com"></script> index.html
import { useState, useEffect } from "react";

const SearchDomain = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const fetchDomainInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ipinfo.io/json");
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult({ error: "Veri çekme başarısız!" });
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-all duration-500 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
      }`}
    >
      <button
        onClick={toggleDarkMode}
        className={`fixed top-4 right-4 p-2 rounded-full transition-all duration-500 ${
          isDarkMode
            ? "bg-white text-gray-900 hover:bg-gray-200"
            : "bg-gray-900 text-white hover:bg-gray-700"
        }`}
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
      <button
        onClick={fetchDomainInfo}
        disabled={loading}
        className={`px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white font-semibold`}
      >
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          "Get IP Info"
        )}
      </button>

      {result && (
        <div className="mt-8 w-full max-w-md">
          <div
            className={`p-6 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 ${
              isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-blue-500">IP Information</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">IP:</span> {result.ip}
                </p>
                <p>
                  <span className="font-semibold">Country:</span> {result.country}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {result.city}
                </p>
                <p>
                  <span className="font-semibold">Organization:</span> {result.org}
                </p>
                <p>
                  <span className="font-semibold">Hostname:</span> {result.hostname}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDomain;
