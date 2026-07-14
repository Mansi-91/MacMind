import { useState } from "react";
import api from "../services/api";

function ScanButton({ onComplete }) {

    const [loading, setLoading] = useState(false);

    const scanFolder = async () => {

        try {
            setLoading(true);

            const folderPath =
                "/Users/mansikapse/Desktop/MacMind_Test";

            await api.get(`/scan?path=${folderPath}`);

            alert("Scan completed!");

            onComplete();

        } catch (err) {
            console.error(err);
            alert("Scan failed");
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <button
            onClick={scanFolder}
            className="
            bg-indigo-600 
            hover:bg-indigo-700 
            px-5 
            py-3 
            rounded-xl 
            text-white 
            font-semibold
            transition
            "
        >
            {loading ? "Scanning..." : "Scan Folder"}
        </button>
    );
}

export default ScanButton;