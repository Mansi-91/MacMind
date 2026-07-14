import { useState } from "react";

function FileFilters({ onFilter }) {

    const [extension, setExtension] = useState("");
    const [minSize, setMinSize] = useState("");
    const [maxSize, setMaxSize] = useState("");

    const applyFilters = () => {

        onFilter({
            extension,
            minSize,
            maxSize
        });

    };

    const clearFilters = () => {

        setExtension("");
        setMinSize("");
        setMaxSize("");

        onFilter({});

    };

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-6">

            <h2 className="text-xl font-semibold mb-4">
                Advanced Filters
            </h2>

            <div className="flex flex-wrap gap-4">

                <select
                    value={extension}
                    onChange={(e)=>setExtension(e.target.value)}
                    className="border rounded-lg p-2"
                >

                    <option value="">All Types</option>
                    <option value=".pdf">PDF</option>
                    <option value=".java">Java</option>
                    <option value=".txt">Text</option>
                    <option value=".png">PNG</option>
                    <option value=".jpg">JPG</option>

                </select>


                <input
                    type="number"
                    placeholder="Min Size (bytes)"
                    value={minSize}
                    onChange={(e)=>setMinSize(e.target.value)}
                    className="border rounded-lg p-2"
                />


                <input
                    type="number"
                    placeholder="Max Size (bytes)"
                    value={maxSize}
                    onChange={(e)=>setMaxSize(e.target.value)}
                    className="border rounded-lg p-2"
                />


                <button
                    onClick={applyFilters}
                    className="bg-indigo-600 text-white px-5 rounded-lg"
                >
                    Apply
                </button>


                <button
                    onClick={clearFilters}
                    className="bg-zinc-700 text-white px-5 rounded-lg"
                >
                    Reset
                </button>

            </div>

        </div>

    );

}

export default FileFilters;
