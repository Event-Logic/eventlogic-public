"use client";

import { useState } from "react";
import Image from "next/image";
import RoomBookingWidget from "./RoomBookingWidget";

interface RoomCardProps {
  id: number;
  lang: string; // Keep as lang to match existing component usage
  title: string;
  description: string;
  image: string;
  features: string[];
  roomTypeId: string; // Sirvoy room type ID
}

export default function RoomCard({
  id,
  lang,
  title,
  description,
  image,
  features,
  roomTypeId
}: RoomCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Determine if description should be truncated
  const isTruncated = description.length > 150;
  const truncatedDescription = isTruncated
    ? `${description.substring(0, 150)}...`
    : description;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Room Image */}
      <div className="h-64 relative">
        {image.startsWith('http') ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
        ) : (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Room Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-blue-900">{title}</h3>

        <div className="mb-4">
          <p className="text-gray-700">
            {expanded ? description : truncatedDescription}
          </p>

          {isTruncated && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 focus:outline-none"
            >
              {expanded
                ? (lang === 'en' ? 'Show less' : 'Visa mindre')
                : (lang === 'en' ? 'Show more' : 'Visa mer')}
            </button>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <span
              key={index}
              className="inline-block bg-blue-50 text-blue-800 rounded-full px-3 py-1 text-sm font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Booking Widget - Using direct link for a cleaner experience */}
        <RoomBookingWidget
          lang={lang}
          roomType={roomTypeId}
          roomName={title.split(',')[0]} // Use first part of title as room name
          useDirectLink={true} // Use direct link to Sirvoy booking engine
        />
      </div>
    </div>
  );
}
