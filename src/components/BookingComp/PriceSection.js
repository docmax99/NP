export default function PriceSection({price}) {
    return (
      <div className="flex items-center text-lg mb-4">
        <span className="line-through text-gray-400 mr-2">{`${price + (price * 0.15)}€`}</span>
        <span className="text-2xl font-bold">{`${price}€`}</span>
        <span className="text-lg ml-2">Nacht</span>
      </div>
    );
  }
  
  