import { Locale } from "../dictionaries";

type TestimonialsProps = {
  lang: Locale;
  dictionary: {
    home: {
      testimonials: {
        title: string;
        testimonial1: {
          text: string;
          author: string;
        };
        testimonial2: {
          text: string;
          author: string;
        };
        testimonial3: {
          text: string;
          author: string;
        };
      };
    };
  };
};

export default function Testimonials({ dictionary }: TestimonialsProps) {
  const { testimonials } = dictionary.home;

  const testimonialsList = [
    {
      id: 1,
      text: testimonials.testimonial1.text,
      author: testimonials.testimonial1.author,
    },
    {
      id: 2,
      text: testimonials.testimonial2.text,
      author: testimonials.testimonial2.author,
    },
    {
      id: 3,
      text: testimonials.testimonial3.text,
      author: testimonials.testimonial3.author,
    },
  ];

  return (
    <section className="py-16 px-4 bg-purple-900 text-white dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {testimonials.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonialsList.map((testimonial) => (
            <div key={testimonial.id} className="bg-purple-800 dark:bg-purple-950 p-8 rounded-lg relative shadow-lg transform transition-transform hover:scale-105">
              {/* Quote icon */}
              <div className="absolute -top-6 left-8 text-purple-400 text-6xl">&ldquo;</div>

              <p className="text-lg mb-6 relative z-10">{testimonial.text}</p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold mr-4 shadow-md">
                  {testimonial.author.charAt(0)}
                </div>
                <p className="font-medium">{testimonial.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
