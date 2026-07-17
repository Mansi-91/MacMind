import { useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { Bot, Search, LoaderCircle } from "lucide-react";

function AISearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setResults([]);

    try {
      const res = await api.post("/ai/search", {
        query,
      });

      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else {
        setResults([
          {
            name: "Unexpected Response",
            reason: JSON.stringify(res.data),
            path: "",
          },
        ]);
      }
    } catch (err) {
      console.error(err);

      setResults([
        {
          name: "Error",
          reason: "Unable to contact AI server.",
          path: "",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <Bot size={40} />
            <div>
              <h1 className="text-4xl font-bold">AI Search</h1>

              <p className="text-indigo-100">
                Search your Mac using natural language.
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <input
              type="text"
              placeholder="Find my Java notes..."
              className="flex-1 p-4 rounded-xl text-black outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <button
              onClick={handleSearch}
              className="bg-white text-indigo-700 px-6 rounded-xl font-semibold hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-5">AI Results</h2>

          {loading ? (
            <div className="flex items-center gap-3 text-indigo-600">
              <LoaderCircle className="animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : results.length === 0 ? (
            <p className="text-gray-500">Ask MacMind something.</p>
          ) : (
            results.map((file, index) => (
              <div key={index} className="bg-white rounded-xl shadow p-5 mb-4">
                <h3 className="font-bold text-lg">{file.name}</h3>

                <p className="text-gray-600 mt-2">{file.reason}</p>

                <p className="text-sm text-gray-400 mt-3">{file.path}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AISearch;
