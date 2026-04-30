import React from "react";
import { Users, Image, Heart, TrendingUp } from "lucide-react";

const StatsCards = ({ stats }) => {

  const cards = [
    {
      title: "Total Images",
      value: stats.totalImages,
      icon: <Image />,
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Total Likes",
      value: stats.totalLikes,
      icon: <Heart />,
      gradient: "from-red-500 to-pink-600",
    },
    {
      title: "Most Liked",
      value: stats.mostLiked?.title || "N/A",
      icon: <TrendingUp />,
      gradient: "from-green-500 to-emerald-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

      {cards.map((card, index) => (
        <div
          key={index}
          className={`
            relative p-5 rounded-2xl text-white shadow-lg
            bg-gradient-to-br ${card.gradient}
            transition-all duration-300
            hover:scale-105 hover:shadow-2xl
            cursor-pointer overflow-hidden
          `}
        >

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition duration-300"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-2">

            <div className="flex items-center justify-between">

              <p className="text-sm opacity-90">
                {card.title}
              </p>

              <div className="opacity-80 group-hover:rotate-12 transition duration-300">
                {card.icon}
              </div>

            </div>

            <h2 className="text-xl md:text-2xl font-bold truncate">
              {card.value}
            </h2>
          </div>

        </div>
      ))}

    </div>
  );
};

export default StatsCards;