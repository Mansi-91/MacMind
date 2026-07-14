import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

import {
    useEffect,
    useState
} from "react";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import LargestFiles from "../components/LargestFiles";
import RecentFiles from "../components/RecentFiles";


function Analytics() {


    const [fileTypes, setFileTypes] = useState([]);

    const [storageData, setStorageData] = useState([]);



    useEffect(() => {


        const fetchAnalytics = async()=>{


            try{


                const fileResponse =
                await api.get("/dashboard/file-types");


                const storageResponse =
                await api.get("/dashboard/storage");



                setFileTypes(
                    fileResponse.data
                );


                setStorageData(
                    storageResponse.data
                );


            }
            catch(error){

                console.log(
                    "Analytics Error:",
                    error
                );

            }


        };


        fetchAnalytics();


    },[]);



    return (

        <div className="flex">


            <Sidebar/>


            <div className="
            flex-1
            p-8
            bg-zinc-100
            min-h-screen
            ">


                <h1 className="
                text-3xl
                font-bold
                mb-8
                ">
                    Analytics
                </h1>



                {/* PIE CHART */}

                <div className="
                bg-white
                rounded-xl
                shadow
                p-6
                mb-8
                w-fit
                ">


                    <h2 className="
                    text-xl
                    font-semibold
                    mb-5
                    ">
                        File Distribution
                    </h2>



                    <PieChart
                        width={400}
                        height={400}
                    >

                        <Pie

                            data={fileTypes}

                            dataKey="count"

                            nameKey="extension"

                            cx="50%"

                            cy="50%"

                            outerRadius={120}

                            label

                        >


                        {
                            fileTypes.map(
                                (item,index)=>(

                                    <Cell
                                    key={index}
                                    />

                                )
                            )
                        }


                        </Pie>


                        <Tooltip/>

                        <Legend/>


                    </PieChart>



                </div>





                {/* BAR CHART */}


                <div className="
                bg-white
                rounded-xl
                shadow
                p-6
                w-fit
                ">


                    <h2 className="
                    text-xl
                    font-semibold
                    mb-5
                    ">
                        Storage Usage
                    </h2>



                    <BarChart

                        width={500}

                        height={300}

                        data={storageData}

                    >


                        <CartesianGrid />


                        <XAxis
                            dataKey="extension"
                        />


                        <YAxis/>


                        <Tooltip/>


                        <Bar
                            dataKey="storage"
                        />


                    </BarChart>

                    

                </div>

                <div>
                    <LargestFiles/>
                </div>

                <div>
                    <RecentFiles/>
                </div>



            </div>


        </div>

    );

}


export default Analytics;