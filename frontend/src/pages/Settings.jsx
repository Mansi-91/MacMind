import Sidebar from "../components/Sidebar";

function Settings() {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-8 bg-zinc-100 min-h-screen">
                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="mt-4 text-zinc-600">
                    Settings page coming soon...
                </p>
            </div>
        </div>
    );
}

export default Settings;