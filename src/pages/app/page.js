import Link from "next/link";

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
        </div>
        <div className="basis-1/2">
          <button className="bg-indigo-500 hover:bg-cyan-600 rounded-md border-spacing-">
          save and Change
          </button>
        </div>
      </div>
      
      
    

    );

  }

