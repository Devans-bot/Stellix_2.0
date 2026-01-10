import Masonry from "react-masonry-css";
import React from "react";
const desktopview = {
  default: 5,
  1400: 5,
  1200: 4,
  992: 3,
  700: 2,
  480: 1,
};

const mobileview = {
  default: 6,
  1400: 5,
  1200: 4,
  992: 3,
  700: 2,
  480: 2,
};

const heights = [
  "h-[160px]",
  "h-[200px]",
  "h-[240px]",
  "h-[280px]",
  "h-[320px]",
  "h-[360px]",
];

const SkeletonPin = () => {
  const h = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div
      className={`w-full ${h} rounded-xl bg-[#1a1a1a] overflow-hidden relative`}
    >
      {/* modern subtle animation */}
      <div className="absolute inset-0 skeleton-soft" />
    </div>
  );
};

export default function HomePinsSkeleton({ count = 20 }) {
  return (
    <div className="-mt-10 overflow-hidden min-h-screen">

      {/* DESKTOP */}
      <div className="bg-[#00000] overflow-hidden mt-28 w-8xl pl-40 hidden md:block">
        <Masonry
          breakpointCols={desktopview}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonPin key={i} />
          ))}
        </Masonry>
      </div>

      {/* MOBILE */}
      <div className="bg-[#0F0E15] min-h-screen mt-10 max-w-7xl mx-auto py-6 px-4 block md:hidden">
        <Masonry
          breakpointCols={mobileview}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array.from({ length: count }).map((_, i) => (
            <SkeletonPin key={i} />
          ))}
        </Masonry>
      </div>

      {/* inline styles to avoid clutter */}
      <style>{`
        .skeleton-soft {
          background: linear-gradient(
            110deg,
            #1a1a1a 40%,
            #242424 50%,
            #1a1a1a 60%
          );
          background-size: 200% 100%;
          animation: skeleton-drift 3.2s ease-in-out infinite,
                     skeleton-breath 2.4s ease-in-out infinite;
        }

        @keyframes skeleton-drift {
          0% { background-position: 0% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes skeleton-breath {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>

    </div>
  );
}
