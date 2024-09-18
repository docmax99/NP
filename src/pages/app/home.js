  import Link from "next/link";
import Image from "next/image";
import Dropdown from '../components/Dropdown';
import TextField from '../components/TextField';


export default function Boxing() {
    return( 
        <div className="flex flex-col gap-4 bg-slate-400">
        
        <div className="flex gap-4">
            <div className="bg-red-400 w-1/2 h-24">
             <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="mt-4 ml-6"/> 
             </div>
            <div className="bg-yellow-300 w-1/2 h-24 flex flex-col "><Dropdown/></div> 
        </div>

    
        <div className="flex gap-3">
            <div className="w-1/6"></div>
            <div className="flex gap-0 border-3 rounded-3xl border-gray-400 w-8/12 bg-white ">
                <div className="w-2/6 ml-2 mb-6 mt-3 "><TextField label="Wohin?" placeholder="Reiseziel" /></div>
                <div className="w-1/14 mb-6 mt-3"><TextField label="Anreise" placeholder="Datum" /></div>
                <div className="w-1/14 mb-6 mt-3"><TextField label="Abreise" placeholder="Datum" /></div>
                <div className="w-1/32 mr-2 mb-6 mt-3"><TextField label="Wer?" placeholder="Anzahl der Gäste" /></div>
            </div>
            <div className="w-3/24"></div>
        </div>

        
        <div className="flex gap-4">
            <div className="bg-red-400 w-1/3 h-64 mr-2 ml-4 rounded-3xl"><Image src="/Images/Hobbit.png" width={140} height={140} alt="Dreamhouse" className="w-full h-full object-cover  rounded-3xl "/></div>
            <div className="bg-yellow-300 w-1/3 h-64 mr-2 ml-4 rounded-3xl"><Image src="/Images/Berghaus.png" width={140} height={140} alt="BergHaus" className="w-full h-full object-cover   rounded-3xl  "/></div>
            <div className="bg-green-400 w-1/3 h-64 mr-4 ml-2 rounded-3xl"><Image src="/Images/Modernhouse.png" width={140} height={140} alt="Modernhouse" className="w-full h-full object-cover  rounded-3xl "/></div>
        </div>

        
        <div className="bg-gray-500 w-full h-24"></div>

        
        <div className="flex gap-4">
            <div className="bg-green-400 w-1/3 h-24"></div>
            <div className="bg-red-400 w-1/3 h-24"></div>
            <div className="bg-yellow-300 w-1/3 h-24"></div>
        </div>

        <div className="bg-gray-500 w-full h-24"></div>

       
        <div className="bg-green-400 w-full h-24"></div>
        
    </div>
          
      
    

    );

  }
