import {useEffect,useState} from "react";
import api from "../services/api";


function LargestFiles(){


const [files,setFiles]=useState([]);



useEffect(()=>{


async function fetchFiles(){

const res =
await api.get("/dashboard/largest-files");


setFiles(res.data);

}


fetchFiles();


},[]);



function formatSize(bytes){

if(bytes < 1024)
return bytes+" B";


if(bytes < 1024*1024)
return (bytes/1024).toFixed(2)+" KB";


return (bytes/(1024*1024)).toFixed(2)+" MB";

}



return (

<div className="
bg-white
rounded-xl
shadow
p-6
mt-8
">


<h2 className="
text-xl
font-semibold
mb-5
">

Largest Files

</h2>



<table className="w-full">


<thead>

<tr className="border-b">

<th className="text-left p-3">
Name
</th>

<th className="text-left p-3">
Type
</th>

<th className="text-left p-3">
Size
</th>


</tr>

</thead>



<tbody>


{
files.map((file)=>(


<tr
key={file.path}
className="border-b"
>


<td className="p-3">
{file.name}
</td>


<td className="p-3">
{file.extension}
</td>


<td className="p-3">
{formatSize(file.size)}
</td>


</tr>


))
}



</tbody>


</table>



</div>

)

}


export default LargestFiles;
