import Link from "next/link";
import { Locale } from "../dictionaries";

type NavigationProps = {
  lang: Locale;
  dictionary: {
    navigation: {
      home: string;
      rooms: string;
      dining: string;
      conference: string;
      activities: string;
      about: string;
      contact: string;
      book: string;
      information: string;
      events: string;
      weddings: string;
      celebrations: string;
      retreats: string;
    };
  };
};

export default function Navigation({ lang, dictionary }: NavigationProps) {
  const { navigation } = dictionary;
  
  // Define the alternate language
  const alternateLanguage: Locale = lang === "en" ? "sv" : "en";
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href={`/${lang}`} className="font-bold text-xl text-white">
              Mollösunds Wärdshus
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <Link href={`/${lang}`} className="text-white hover:text-gray-300 transition-colors">
              {navigation.home}
            </Link>
            <Link 
              href={`/${lang}/${lang === 'en' ? 'rooms' : 'rum'}`} 
              className="text-white hover:text-gray-300 transition-colors"
            >
              {navigation.rooms}
            </Link>
            <Link 
              href={`/${lang}/information`} 
              className="text-white hover:text-gray-300 transition-colors"
            >
              {navigation.information}
            </Link>
            <Link 
              href={`/${lang}/${lang === 'en' ? 'restaurant' : 'restaurang'}`} 
              className="text-white hover:text-gray-300 transition-colors"
            >
              {navigation.dining}
            </Link>
            
            {/* Events Dropdown */}
            <div className="relative group">
              <button className="text-white hover:text-gray-300 transition-colors flex items-center">
                {navigation.events}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-blue-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link 
                  href={`/${lang}/${lang === 'en' ? 'conference' : 'konferens'}`} 
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  {navigation.conference}
                </Link>
                <Link 
                  href={`/${lang}/${lang === 'en' ? 'weddings' : 'brollop'}`} 
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  {navigation.weddings}
                </Link>
                <Link 
                  href={`/${lang}/${lang === 'en' ? 'celebrations' : 'fester'}`} 
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  {navigation.celebrations}
                </Link>
                <Link 
                  href={`/${lang}/${lang === 'en' ? 'retreats' : 'retreats'}`} 
                  className="block px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  {navigation.retreats}
                </Link>
              </div>
            </div>
            
            <Link 
              href={`/${lang}/${lang === 'en' ? 'contact' : 'kontakt'}`} 
              className="text-white hover:text-gray-300 transition-colors"
            >
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
              className="text-white hover:text-gray-300 transition-colors"
            >
              {alternateLanguage.toUpperCase()}
            </Link>
            
            <Link
              href={`/${lang}/booking`}
              className="bg-white text-blue-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              {navigation.book}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
