import Link from "next/link";
import Image from "next/image";
import Dropdown from '../components/Dropdown';
import TextField from '../components/TextField';


export default function Boxing() {
    return( 
        <div class="flex flex-col gap-4 bg-slate-400">
        
        <div class="flex gap-4">
            <div class="bg-red-400 w-1/2 h-24">
             <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="mt-4 ml-6"/> 
             </div>
            <div class="bg-yellow-300 w-1/2 h-24"><Dropdown/></div>
        </div>

        
        
        <div className="flex gap-0">
            <div className="w-1/6 ml-44"><TextField label="Wohin?" placeholder="Reiseziel" /></div>
            <div className="w-1/14 "><TextField label="Anreise" placeholder="Datum" /></div>
            <div className="w-1/14 "><TextField label="Abreise" placeholder="Datum" /></div>
            <div className="w-1/16 "><TextField label="Wer?" placeholder="Anzahl der Gäste" /></div>
        </div>
        

        
        <div class="flex gap-4">
            <div class="bg-red-400 w-1/3 h-64 "><Image src="/Images/Hobbit.png" width={140} height={140} alt="Dreamhouse" className="w-full h-full object-cover mr-6 rounded-lg"/></div>
            <div class="bg-yellow-300 w-1/3 h-64 "><Image src="/Images/Berghaus.png" width={140} height={140} alt="BergHaus" className="w-full h-full object-cover mr-6  rounded-lg"/></div>
            <div class="bg-green-400 w-1/3 h-64 "><Image src="/Images/Modernhouse.png" width={140} height={140} alt="Modernhouse" className="w-full h-full object-cover mr-6 rounded-lg"/></div>
        </div>

        
        <div class="bg-gray-500 w-full h-24"></div>

        
        <div class="flex gap-4">
            <div class="bg-green-400 w-1/3 h-24"></div>
            <div class="bg-red-400 w-1/3 h-24"></div>
            <div class="bg-yellow-300 w-1/3 h-24"></div>
        </div>

        <div class="bg-gray-500 w-full h-24"></div>

       
        <div class="bg-green-400 w-full h-24"></div>
        
    </div>
          
      
    

    );

  }
