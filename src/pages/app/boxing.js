import Link from "next/link";
import Image from "next/image";


export default function Boxing() {
    return( 
        <div class="flex flex-col gap-4 bg-slate-400">
        
        <div class="flex gap-4">
            <div class="bg-red-400 w-1/2 h-24">
             <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="mt-4 ml-6"/> 
             
             </div>
            <div class="bg-yellow-300 w-1/2 h-24"></div>
        </div>

        
        <div class="bg-blue-500 w-full h-24"></div>

        
        <div class="flex gap-4">
            <div class="bg-red-400 w-1/3 h-24"></div>
            <div class="bg-yellow-300 w-1/3 h-24"></div>
            <div class="bg-green-400 w-1/3 h-24"></div>
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
