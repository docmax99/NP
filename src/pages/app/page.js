import Link from "next/link";
import Image from "next/image";

export default function Page() {
    return( 
      <div className="flex flex-row">
        <div className="basis-1/4" >
          <h1 className="text-red-500">Hello on my Side</h1>
        </div>
        <div className="basis-1/4 bg-red-700 rounded-md border-spacing-3">
          <Link href={'/'}>
          <p className="text-center">Home Page</p>
          </Link>
          <Image src="/Images/NP-Logo.png" width={500} height={500} alt="Logo" />
        </div>
        <div className="basis-1/2">
          <button className="bg-indigo-500 hover:bg-cyan-600 rounded-md border-spacing-">
          save and Change
          </button>
          
        </div>
      </div>
      
      
    

    );

  }

