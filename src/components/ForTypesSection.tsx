"use client";

import { useState } from "react";
import Link from "next/link";
import { Locale } from "../dictionaries";
import Image from "next/image";

type ForTypesSectionProps = {
  lang: Locale;
  dictionary: {
    home: {
      for_types: {
        title: string;
        meeting_planners: {
          title: string;
          description: string;
        };
        buyers: {
          title: string;
          description: string;
        };
        travel_agencies: {
          title: string;
          description: string;
        };
        suppliers: {
          title: string;
          description: string;
        };
      };
    };
    navigation: {
      meeting_planners: string;
      buyers: string;
      travel_agencies: string;
      suppliers: string;
    };
  };
};

type TabType = "meeting_planners" | "buyers" | "travel_agencies" | "suppliers";

export default function ForTypesSection({ lang, dictionary }: ForTypesSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("meeting_planners");
  const { for_types } = dictionary.home;
  const { navigation } = dictionary;

  const tabs = [
    { id: "meeting_planners", label: navigation.meeting_planners, image: "/images/for-types/meetingPlanner.jpg" },
    { id: "buyers", label: navigation.buyers, image: "/images/for-types/buyer.jpg" },
    { id: "travel_agencies", label: navigation.travel_agencies, image: "/images/for-types/travelAgency.jpg" },
    { id: "suppliers", label: navigation.suppliers, image: "/images/for-types/supplier.jpg" },
  ];

  const getContent = (tabId: TabType) => {
    const content = {
      meeting_planners: {
        title: for_types.meeting_planners.title,
        description: for_types.meeting_planners.description,
        url: `/${lang}/meeting-planners`,
      },
      buyers: {
        title: for_types.buyers.title,
        description: for_types.buyers.description,
        url: `/${lang}/buyers`,
      },
      travel_agencies: {
        title: for_types.travel_agencies.title,
        description: for_types.travel_agencies.description,
        url: `/${lang}/travel-agencies`,
      },
      suppliers: {
        title: for_types.suppliers.title,
        description: for_types.suppliers.description,
        url: `/${lang}/suppliers`,
      },
    };

    return content[tabId];
  };

  const activeContent = getContent(activeTab);
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {for_types.title}
        </h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
            {activeTabData && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900 opacity-60 z-10"></div>
            )}
            {activeTabData && (
              <Image
                src={activeTabData.image}
                alt={activeTabData.label}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">{activeContent.title}</h3>
            <p className="text-lg text-gray-700 mb-6">{activeContent.description}</p>
            <Link
              href={activeContent.url}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
