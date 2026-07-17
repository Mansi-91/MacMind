import { FolderOpen, HardDrive, Clock } from "lucide-react";

function HeroSection({ stats }) {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const storageGB = (stats.totalStorage / (1024 * 1024 * 1024)).toFixed(2);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 text-white p-8 shadow-xl mb-8">
      {/* Background circles */}

      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">🧠 MacMind</h1>

          <p className="text-xl font-medium">{greeting()} 👋</p>

          <p className="text-indigo-100 mt-2 text-lg">
            Your personal desktop intelligence dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 text-center">
            <FolderOpen className="mx-auto mb-2" size={28} />

            <p className="text-3xl font-bold">{stats.totalFiles}</p>

            <p className="text-sm text-indigo-100">Total Files</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 text-center">
            <HardDrive className="mx-auto mb-2" size={28} />

            <p className="text-3xl font-bold">{storageGB} GB</p>

            <p className="text-sm text-indigo-100">Storage Used</p>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl px-6 py-5 text-center">
            <Clock className="mx-auto mb-2" size={28} />

            <p className="text-lg font-semibold">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <p className="text-sm text-indigo-100">Last Opened</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
