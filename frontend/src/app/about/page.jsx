import { Paper } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <div>
      <div className=" h-[250px] flex mb-[-100px]">
        <Image src="/about.png" width={500} height={500} />
      </div>
      <div className="flex space-x-6 justify-center items-center">
        <Paper className="w-2/5 p-8 mt-10" elevation={9}>
          <b>Hermes Tour</b> is not just a travel organization; it's a gateway
          to extraordinary experiences, meticulously crafted for passionate
          travelers seeking unparalleled adventures. Rooted in a commitment to
          redefine travel, we pave the way for explorers yearning for new
          horizons and exciting encounters. <br />
          <br />
          Dedicated to delivering unparalleled moments, we transcend the
          ordinary, offering a kaleidoscope of natural wonders, cultural
          treasures, and distinctive destinations across the globe. At
          <b> Hermes Tour</b>, we curate journeys that linger in the hearts and
          minds of our customers, creating indelible memories that span
          continents. <br />
          <br />
          <b>Our mission</b> goes beyond being a travel facilitator; we aspire
          to be the architects of dreams, ensuring our customers embark on
          journeys that are not only safe and comfortable but also deeply
          gratifying. With a team comprised of the industry's finest guides,
          strategic hotel collaborations, and meticulously designed tour
          programs, <b>we elevate travel to an art form.</b>
          <br />
        </Paper>
        <div className="w-[700px]">
          <Image src="/about.jpg" width={1000} height={50} />
        </div>
      </div>
    </div>
  );
}
