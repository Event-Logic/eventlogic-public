import { Locale } from "../dictionaries";
import Image from "next/image";
import Link from "next/link";

type EventCoachProps = {
  lang: Locale;
  dictionary: {
    home: {
      event_coach: {
        title: string;
        description1: string;
        description2: string;
      };
    };
  };
};

export default function EventCoach({ lang, dictionary }: EventCoachProps) {
  const { event_coach } = dictionary.home;

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {event_coach.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {event_coach.description1}
            </p>
            <p className="text-lg text-gray-700 mb-8">
              {event_coach.description2}
            </p>
            <Link
              href={`/${lang}/event-coach`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
          <div className="relative h-80 md:h-96">
            <Image
              src="/images/event-coach/event-coach.jpg"
              alt="Event Coach"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
