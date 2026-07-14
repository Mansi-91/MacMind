import Sidebar from "../components/Sidebar";

function AISearch() {
    return (
        <div className="flex">
            <Sidebar />

            <div className="flex-1 p-8 bg-zinc-100 min-h-screen">
                <h1 className="text-3xl font-bold">
                    AI Search
                </h1>

                <p className="mt-4 text-zinc-600">
                    AI Search is coming soon...
                </p>
            </div>
        </div>
    );
}

export default AISearch;