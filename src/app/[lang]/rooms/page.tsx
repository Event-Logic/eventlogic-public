import { getDictionary } from "../../../dictionaries";
import type { Locale } from "../../../dictionaries";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: Locale }> 
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: `Våra rum | Mollösunds Wärdshus`,
    description: "Upptäck våra tio unika rum med havsutsikt och bekväma faciliteter.",
  };
}

export default async function RoomsPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Room data
  const rooms = [
    {
      id: 1,
      image: "https://wards.se/wp-content/uploads/2022/05/e2a66eef-5d5c-4ff5-8de1-ab45c200ef1d_large-480x1038.jpg.webp",
      title: "Rum #1, Dubbelrum",
      description: "Ett rum för återhämtning och harmoni 160 cm queensize-säng med mjuka lakan. Här finns även bäddsoffa för 2 personer. Rummet är 18 kvm inrett med varma färger och fina trädetaljer. Privat toalett och dusch med lyxiga toalettartiklar. 22 kvm möblerad terrass med utsikt över hav och hamn.",
      features: ["160 cm säng", "Bäddsoffa", "18 kvm", "Terrass", "Havsutsikt"]
    },
    {
      id: 2,
      image: "https://wards.se/wp-content/uploads/2022/05/b8fa2ac3-60e0-4dbd-8389-48afa06cf1b9_large-480x1038.jpg.webp",
      title: "Rum #2, Dubbelrum",
      description: "Ett rum för återhämtning och harmoni. 160 cm queensize-säng med mjuka lakan. Rummet är 18 kvm inrett i varma färger och med fina trädetaljer. Privat toalett och dusch med lyxiga toalettartiklar. 22 kvm möblerad terrass med utsikt över hav och hamn.",
      features: ["160 cm säng", "18 kvm", "Terrass", "Havsutsikt"]
    },
    {
      id: 3,
      image: "https://wards.se/wp-content/uploads/2022/05/rum-3-640x853.jpg.webp",
      title: "Rum #3, Dubbelrum",
      description: "Dubbelrum på 18 kvm med havsutsikt och vackert trägolv och fina detaljer, ett rum som andas återhämtning. 180 cm kingsize-säng med mjuka lakan Privat dusch och toalett med lyxiga toalettartiklar.",
      features: ["180 cm säng", "18 kvm", "Havsutsikt", "Trägolv"]
    },
    {
      id: 4,
      image: "https://wards.se/wp-content/uploads/2022/05/231CFA37-4A81-4878-99E5-A3E1E6B4A599-640x480.jpeg",
      title: "Rum #4, Dubbelrum",
      description: "18 kvm rum med vackert trägolv och fina detaljer, ett rum som andas återhämtning, 160 queenzise säng med mjuka lakan. Privat dusch och toalett med lyxiga toalettartiklar. Utsikt över trädgård och uteservering.",
      features: ["160 cm säng", "18 kvm", "Trädgårdsutsikt", "Trägolv"]
    },
    {
      id: 5,
      image: "https://wards.se/wp-content/uploads/2022/05/DE49B3AE-933A-4EDA-89E5-F793091E2265-640x480.jpeg",
      title: "Rum #5, Extrarum för familjen",
      description: "Lilla rummet på 11 kvm. Perfekt som extrarum till den stora barnfamiljen. Två våningsängar, 80 cm Privat dusch och toalett med lyxiga toalettartiklar.",
      features: ["Våningssängar", "11 kvm", "Barnvänligt"]
    },
    {
      id: 6,
      image: "https://wards.se/wp-content/uploads/2022/05/image00800-640x480.jpeg.webp",
      title: "Rum #6, Familjerum",
      description: "Vårt största rum 20 kvm med utsikt mot väg. 160 cm dubbelsäng med sköna lakan. Våningsäng 80 cm i förmak. Privat dusch och toalett med lyxiga toalettartiklar. Mjuk ullmatta på golvet.",
      features: ["160 cm säng", "Våningsäng", "20 kvm", "Ullmatta"]
    },
    {
      id: 7,
      image: "https://wards.se/wp-content/uploads/2022/05/B7599BF9-602D-4480-8019-FFBBFAC6D2B3-640x480.jpeg.webp",
      title: "Rum #7, Dubbelrum",
      description: "En trappa upp ligger detta lilla mysiga rum på 12 kvm. Här finns två separata 90 sängar. Privat dusch och toalett med härliga toalettartiklar. Mjuk ullmatta på golvet.",
      features: ["Två 90 cm sängar", "12 kvm", "Ullmatta"]
    },
    {
      id: 8,
      image: "https://wards.se/wp-content/uploads/2022/05/7FCD3336-5394-4306-92CE-25FCE2B16F5A-640x480.jpeg.webp",
      title: "Rum #8, Trebäddsrum",
      description: "En trappa upp ligger detta lilla mysiga rum på 12 kvm. En kärlekssäng med en underslaf på 140cm och en överslag på 80 cm bor den lilla familjen eller kompisgänget gott. Privat dusch och toalett med härliga toalettartiklar. Mjuk ullmatta på golvet.",
      features: ["140 cm säng", "80 cm överslaf", "12 kvm", "Ullmatta"]
    },
    {
      id: 9,
      image: "https://wards.se/wp-content/uploads/2022/05/A7AF8094-46E4-422D-A361-B14C8A539CC6-640x480.jpeg.webp",
      title: "Rum #9, Trebäddsrum",
      description: "På entréplan ligger detta lilla mysiga rum på 14 kvm. En säng med en underslaf på 140 cm och en överslaf på 80 cm. Här bor den lilla familjen eller kompisgänget gott. Privat dusch och toalett med härliga toalettartiklar. Hängstol och inrett med varma färger som skapar harmoni.",
      features: ["140 cm säng", "80 cm överslaf", "14 kvm", "Hängstol"]
    },
    {
      id: 10,
      image: "https://wards.se/wp-content/uploads/2022/05/A7AF8094-46E4-422D-A361-B14C8A539CC6-640x480.jpeg.webp",
      title: "Rum #10, Dubbelrum",
      description: "På entréplan ligger detta rum på 15 kvm med vackert trägolv och fina detaljer. Ett rum som andas återhämtning. 160 cm queensize- säng med mjuka lakan. Privat dusch och toalett med härliga toalettartiklar. Mjuk ullmatta på golvet.",
      features: ["160 cm säng", "15 kvm", "Trägolv", "Ullmatta"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section with dark background */}
      <div className="relative bg-blue-900 pt-24">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Våra rum
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white">
              Bo bekvämt på vårt hotell beläget vid havet i Mollösund
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-16 text-center">
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Må bra och sov gott i ett av våra tio smakligt inredda rum. Vakna upp till en oslagbar utsikt och njut av god frukost på vår terrass.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
            Wärds Mollösund kom till på 1850-talet och kallades då "Gäschivan", alla rum ser olika ut med sin egen charm.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
            Hotellet är beläget i hjärtat av Mollösund med några meter ner till hamnen.
          </p>
          <p className="mt-4 text-lg text-gray-600 max-w-4xl mx-auto">
            Vi har valt att inte ha TV på våra rum för att skapa en lugn och avkopplande miljö.
          </p>
          <div className="mt-8">
            <Link 
              href={`/${lang}/booking`}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {lang === 'en' ? 'Book Now' : 'Boka nu'}
            </Link>
          </div>
        </div>

        {/* Room Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Våra rum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map((room) => (
              <div key={room.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="h-64 bg-gray-200 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${room.image}')` }}
                  ></div>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{room.title}</h3>
                  <p className="text-gray-600 mb-4">{room.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {room.features.map((feature, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frukost Information */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Frukost Information</h2>
          <p className="text-gray-700 mb-4">
            Observera att under lågsäsong serveras frukost som frukostpaket istället för på buffé.
          </p>
          <p className="text-gray-700 mb-2">Dessa datum serveras frukostpaket:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>30 september – 28 mars</li>
            <li>Samt under vardagar 29 mars – 21 juni & 1 september – 29 september</li>
          </ul>
          <p className="text-gray-700">
            Är ni ett större gäng så går det att öppna hela hotellet för både frukost samt middag.
          </p>
        </div>

        {/* Hotel Amenities */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Hotellets faciliteter</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <h3 className="font-semibold">WiFi inkluderat</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
              <h3 className="font-semibold">Frukost ingår alltid</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="font-semibold">Restaurang</h3>
            </div>
            <div className="p-4">
              <svg className="h-10 w-10 mx-auto mb-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold">Mötesanläggning</h3>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Kontakta oss</h2>
          <p className="text-gray-700 mb-2">Har du frågor kontakta oss på <a href="mailto:hotell@wards.se" className="text-blue-600 hover:underline">hotell@wards.se</a></p>
          <p className="text-gray-700">Telefon: <a href="tel:030421108" className="text-blue-600 hover:underline">0304-211 08</a></p>
          <p className="text-gray-700 mt-2">Adress: Kyrkvägen 9, 474 70 Mollösund</p>
        </div>
      </div>
    </div>
  );
}
