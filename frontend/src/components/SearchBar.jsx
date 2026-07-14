function SearchBar({ value, onChange }) {

    return (

        <input

            type="text"

            placeholder="🔍 Search files..."

            value={value}

            onChange={onChange}

            className="
            w-full
            md:w-96
            p-3
            rounded-xl
            bg-zinc-900
            text-white
            placeholder-zinc-400
            border
            border-zinc-700
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
            mb-6
            "

        />

    );

}


export default SearchBar;