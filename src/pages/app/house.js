export default function House() {
    return( 

        <div className="relative grid grid-cols-3 gap-2 auto-rows-min">
        <div className="relative col-span-2 row-start-1 bg-blue-500 p-4">One</div>
        <div className="absolute top-0 left-0 col-start-2 col-end-2 row-span-1 bg-red-500 p-16">Two</div>
        <div className="col-start-1 row-start-2 row-end-5 bg-green-500 p-4">Three</div>
        <div className="col-start-3 row-start-3 bg-yellow-500 p-4">Four</div>
        <div className="col-start-2 row-start-4 bg-purple-500 p-4">Five</div>
        <div className="col-start-3 row-start-4 bg-pink-500 p-4">Six</div>
      </div>
      
    
    

    )
}