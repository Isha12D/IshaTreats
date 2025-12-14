import { useRef } from "react";

type Snack = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const snacksData: Snack[] = [
  { id: "1", name: "Namkeen Mix", price: 50, image: "https://i.pinimg.com/736x/07/53/2b/07532b3552d4257ca96712176c3d3491.jpg" },
  { id: "2", name: "Murukku", price: 40, image: "https://i.pinimg.com/736x/31/08/c2/3108c2cff4b25daa151e2883150001f2.jpg" },
  { id: "3", name: "Chakli", price: 45, image: "https://i.pinimg.com/1200x/91/64/6f/91646fe863c57f5d1f6d36ca955bde8f.jpg" },
  { id: "4", name: "Papdi", price: 35, image: "https://i.pinimg.com/1200x/07/fc/ba/07fcbae28993899098f1357240d800c6.jpg" },
  { id: "5", name: "Kurkure", price: 60, image: "https://i.pinimg.com/1200x/79/10/c9/7910c9a8a568d1dcac5e57bd366ed6b9.jpg" },
  { id: "6", name: "Bhakarwadi", price: 55, image: "https://i.pinimg.com/736x/11/93/b2/1193b266bec72d0d6c7a59455d41a33b.jpg" },
  { id: "7", name: "Spicy Chips", price: 70, image: "https://i.pinimg.com/736x/b6/82/fd/b682fdf274bcdcd4527ce681ce5bc49d.jpg" },
  { id: "8", name: "Mini Samosa", price: 80, image: "https://i.pinimg.com/1200x/24/1e/15/241e15c48336270464f3af0b939d5e98.jpg" },
];

const SnacksCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth / 2; // scroll half page
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 p-5 bg-blue-50">
      <h2 className="text-3xl font-bold mb-6">🍿 Explore Our Snacks</h2>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 text-gray-700 rounded-full p-2 z-10 hover:bg-gray-400"
        >
          {"<"}
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 text-gray-700 rounded-full p-2 z-10 hover:bg-gray-400"
        >
          {">"}
        </button>

        {/* Carousel container */}
        <div
          ref={containerRef}
          className="flex gap-12 p-10 ml-10 mr-10 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {snacksData.map((snack) => (
            <div
              key={snack.id}
              className="snap-start flex-shrink-0 w-40 border rounded-xl p-2 shadow hover:shadow-md transition"
            >
              <img
                src={snack.image}
                alt={snack.name}
                className="h-24 w-full object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-semibold">{snack.name}</h3>
              <p className="text-sm font-bold text-gray-700">₹{snack.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnacksCarousel;
