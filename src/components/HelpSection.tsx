import Link from "next/link";
import { Locale } from "../dictionaries";

type HelpSectionProps = {
  lang: Locale;
  dictionary: {
    home: {
      help: {
        title: string;
        description: string;
        contact_text: string;
        contact_button: string;
      };
    };
  };
};

export default function HelpSection({ lang, dictionary }: HelpSectionProps) {
  const { help } = dictionary.home;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {help.title}
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          {help.description}
        </p>
        <p className="text-lg mb-8">
          {help.contact_text}
        </p>
        <Link
          href={`/${lang}/contact`}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
        >
          {help.contact_button}
        </Link>
      </div>
    </section>
  );
}
