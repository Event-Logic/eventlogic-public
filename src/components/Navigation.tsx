import Link from "next/link";
import { Locale } from "@/dictionaries";

type NavigationProps = {
  lang: Locale;
  dictionary: {
    navigation: {
      home: string;
      rooms: string;
      dining: string;
      activities: string;
      about: string;
      contact: string;
      book: string;
    };
  };
};

export default function Navigation({ lang, dictionary }: NavigationProps) {
  const { navigation } = dictionary;
  
  // Define the alternate language
  const alternateLanguage: Locale = lang === "en" ? "sv" : "en";
  
  return (
    <header className="absolute top-0 left-0 right-0 z-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="font-bold text-xl">
              Mollösunds Wärdshus
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href={`/${lang}`} className="hover:text-gray-300">
              {navigation.home}
            </Link>
            <Link href={`/${lang}/rooms`} className="hover:text-gray-300">
              {navigation.rooms}
            </Link>
            <Link href={`/${lang}/dining`} className="hover:text-gray-300">
              {navigation.dining}
            </Link>
            <Link href={`/${lang}/activities`} className="hover:text-gray-300">
              {navigation.activities}
            </Link>
            <Link href={`/${lang}/about`} className="hover:text-gray-300">
              {navigation.about}
            </Link>
            <Link href={`/${lang}/contact`} className="hover:text-gray-300">
              {navigation.contact}
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              href={`/${alternateLanguage}${
                typeof window !== "undefined" 
                  ? window.location.pathname.substring(3) 
                  : ""
              }`}
              className="hover:text-gray-300"
            >
              {alternateLanguage.toUpperCase()}
            </Link>
            
            <Link
              href={`/${lang}/booking`}
              className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              {navigation.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
