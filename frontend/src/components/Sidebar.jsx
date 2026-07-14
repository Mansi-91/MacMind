import { Link, useLocation } from "react-router-dom";


function Sidebar() {

    const location = useLocation();


    const menu = [
        {
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Analytics",
            path: "/analytics"
        },
        {
            name: "Files",
            path: "/files"
        },
        {
            name: "AI Search",
            path: "/ai-search"
        },
        {
            name: "Settings",
            path: "/settings"
        }
    ];



    return (

        <div className="
        w-64
        min-h-screen
        bg-zinc-950
        text-white
        p-6
        ">


            <h1 className="
            text-2xl
            font-bold
            mb-10
            ">
                🧠 MacMind
            </h1>



            <div className="space-y-3">


                {
                    menu.map((item)=>(

                        <Link

                        key={item.name}

                        to={item.path}

                        className={`
                        block
                        px-4
                        py-3
                        rounded-xl
                        transition

                        ${
                            location.pathname === item.path
                            ?
                            "bg-indigo-600"
                            :
                            "hover:bg-zinc-800"
                        }

                        `}

                        >

                            {item.name}

                        </Link>

                    ))
                }


            </div>


        </div>

    );

}


export default Sidebar;