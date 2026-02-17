"use client";

import { useRef } from "react";
import PixelCard from "@/components/PixelCard";

const bandMembers = [
  { name: "Klaudia", video: "/band/klaudia.mp4", variant: "pink" },
  { name: "Daniel", video: "/band/daniel.mp4", variant: "pink" },
  { name: "Mateusz", video: "/band/mateusz.mp4", variant: "pink" },
  { name: "Bartek", video: "/band/bartek.mp4", variant: "pink" },
];

const BandMemberCard = ({
  member,
}: {
  member: (typeof bandMembers)[number];
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.warn("Video play prevented:", e);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="w-full max-w-[400px] group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PixelCard
        variant={member.variant}
        gap={5}
        initialActive
        pixelSize={5}
        className="!w-full !h-auto !aspect-[9/16]"
      >
        <video
          ref={videoRef}
          src={member.video}
          muted
          loop
          playsInline
          className="absolute opacity-85 inset-0 w-full h-full object-cover pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-end justify-center p-6 pointer-events-none z-10">
          <h3 className="text-3xl font-bold text-white drop-shadow-[5px_5px_3px_rgba(0,0,0,0.9)] tracking-wider">
            {member.name}
          </h3>
        </div>
      </PixelCard>
    </div>
  );
};

const BandSection = () => {
  return (
    <section id="band" className="py-20">
      <div className="top-0 text-center fade-in pb-[80px] max-md:pb-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Zespół</h2>
        <div className="h-1 w-24 bg-gradient-accent mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-8 px-4 max-w-[1600px] mx-auto place-items-center">
        {bandMembers.map((member) => (
          <BandMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
};

export default BandSection;
