import SlidePage from "@/components/ImageSlide";

export default function Home() {
  return (
    <div className="h-[90vh]">
      <img src="suitcase_background.png" className=" object-cover" />
      <div className="absolute top-32 left-32 w-[700px] h-[500px] ">
        <h3 className="text-8xl font-bold ">
          <span className="text-orange-600">Let's find </span>
          <br /> <span className="ml-14 text-orange-500">your next</span>{" "}
          <span className="bg-amber-400 ml-24 mt-8 inline-block">
            {" "}
            destination
          </span>
        </h3>
      </div>
      <div className="absolute w-[700px]  top-[500px] left-32 rounded-md overflow-hidden shadow-sm ">
        <SlidePage />
      </div>
    </div>
  );
}
