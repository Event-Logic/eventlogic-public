"use client";

import { useState } from "react";
import SirvoyBookingWidget from "./SirvoyBookingWidget";
import Link from "next/link";

// Function to generate a direct booking URL for a specific room type
function getRoomBookingUrl(roomTypeId: string, locale: string) {
  const baseUrl = "https://secured.sirvoy.com/engine/";
  const formId = "bb53d65692fe7622"; // Updated Sirvoy form ID

  return `${baseUrl}${formId}/?lang=${locale}&room_type=${roomTypeId}`;
}

export default function RoomBookingWidget({
  lang, // Keep as lang for backward compatibility
  roomType,
  roomName,
  useDirectLink = false
}: {
  lang: string; // Keep as lang for backward compatibility
  roomType: string;
  roomName: string;
  useDirectLink?: boolean;
}) {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const locale = lang; // Use locale internally for consistency

  // Text based on language
  const checkAvailabilityText = locale === 'en' ? 'Check Availability' : 'Sök tillgänglighet';
  const bookRoomText = locale === 'en' ? `Book ${roomName}` : `Boka ${roomName}`;
  const viewAllRoomsText = locale === 'en' ? 'View all room options' : 'Se alla rumsalternativ';

  // If using direct link, render a link to the internal booking page
  if (useDirectLink) {
    return (
      <div className="mt-4">
        <Link
          href={`/${locale}/booking`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          {checkAvailabilityText}
        </Link>
      </div>
    );
  }

  // Otherwise, use the embedded widget
  return (
    <div className="mt-4">
      {!showBookingForm ? (
        <button
          onClick={() => setShowBookingForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          {checkAvailabilityText}
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-blue-900">
              {bookRoomText}
            </h3>
            <button
              onClick={() => setShowBookingForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="w-full">
            <SirvoyBookingWidget />
          </div>
          <div className="mt-4 text-center">
            <Link
              href={`/${locale}/booking`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {viewAllRoomsText}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
