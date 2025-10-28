import Link from "next/link";
import { Locale } from "../dictionaries";

type EventTypesSectionProps = {
  lang: Locale;
  dictionary: {
    home: {
      event_types: {
        title: string;
        conferences: string;
        meetings: string;
        dinners: string;
        events: string;
        christmas: string;
      };
    };
  };
};

export default function EventTypesSection({ lang, dictionary }: EventTypesSectionProps) {
  const { event_types } = dictionary.home;

  const eventTypes = [
    {
      id: "conferences",
      title: event_types.conferences,
      image: "bg-[url('/images/event-types/conferences.jpg')]",
      url: `/${lang}/event-types/conferences`,
    },
    {
      id: "meetings",
      title: event_types.meetings,
      image: "bg-[url('/images/event-types/meetings.jpg')]",
      url: `/${lang}/event-types/meetings`,
    },
    {
      id: "dinners",
      title: event_types.dinners,
      image: "bg-[url('/images/event-types/dinners.jpg')]",
      url: `/${lang}/event-types/dinners`,
    },
    {
      id: "events",
      title: event_types.events,
      image: "bg-[url('/images/event-types/events.jpg')]",
      url: `/${lang}/event-types/events`,
    },
    {
      id: "christmas",
      title: event_types.christmas,
      image: "bg-[url('/images/event-types/christmas.jpg')]",
      url: `/${lang}/event-types/christmas`,
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {event_types.title}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {eventTypes.map((type) => (
            <Link
              key={type.id}
              href={type.url}
              className={`${type.image} bg-cover bg-center h-48 rounded-lg overflow-hidden relative group`}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold text-center px-2">{type.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
