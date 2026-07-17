import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Files from "./pages/Files";
import AISearch from "./pages/AISearch";
import Settings from "./pages/Settings";
import Duplicates from "./pages/Duplicates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/files" element={<Files />} />

        <Route path="/ai-search" element={<AISearch />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/duplicates" element={<Duplicates />} />

        <Route path="/ai-search" element={<AISearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
