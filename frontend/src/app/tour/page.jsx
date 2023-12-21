"use client";
import * as React from "react";
import TourItem from "@/components/TourItem";

export default function TourPage() {
  const [tours, setTours] = React.useState([]);

  React.useEffect(() => {
    // API'den turların alındığı yer
    const fetchTours = async () => {
      try {
        const response = await fetch("http://localhost:5277/Api/tours");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.error("Error fetching tours:", error.message);
      }
    };

    fetchTours();
  }, []); // Boş dependency array, yalnızca bir kere çalışmasını sağlar

  return (
    <div className="flex flex-wrap justify-start items-start gap-4 mt-10 px-52">
      {tours.map((tour) => (
        <TourItem
          key={tour.id}
          imageUrl={tour.imageUrl}
          description={tour.description}
          name={tour.name}
          price={tour.price}
        />
      ))}
    </div>
  );
}
