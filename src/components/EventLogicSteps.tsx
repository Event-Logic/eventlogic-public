import { Locale } from "../dictionaries";
import Image from "next/image";

type EventLogicStepsProps = {
  lang: Locale;
  dictionary: {
    home: {
      steps: {
        title: string;
        step1: {
          title: string;
          description: string;
        };
        step2: {
          title: string;
          description: string;
        };
        step3: {
          title: string;
          description: string;
        };
        step4: {
          title: string;
          description: string;
        };
        step5: {
          title: string;
          description: string;
        };
        step6: {
          title: string;
          description: string;
        };
      };
    };
  };
};

export default function EventLogicSteps({ lang, dictionary }: EventLogicStepsProps) {
  const { steps } = dictionary.home;

  const stepsData = [
    {
      id: 1,
      title: steps.step1.title,
      description: steps.step1.description,
      image: "/images/steps/planning2.png",
    },
    {
      id: 2,
      title: steps.step2.title,
      description: steps.step2.description,
      image: "/images/steps/find_suppliers2.png",
    },
    {
      id: 3,
      title: steps.step3.title,
      description: steps.step3.description,
      image: "/images/steps/compare_quotes2.png",
    },
    {
      id: 4,
      title: steps.step4.title,
      description: steps.step4.description,
      image: "/images/steps/booking2.png",
    },
    {
      id: 5,
      title: steps.step5.title,
      description: steps.step5.description,
      image: "/images/steps/invite_participants2.png",
    },
    {
      id: 6,
      title: steps.step6.title,
      description: steps.step6.description,
      image: "/images/steps/communicate2.png",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {steps.title}
        </h2>

        <div className="space-y-24">
          {stepsData.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={step.id}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="flex items-center justify-center bg-blue-600 text-white rounded-full w-8 h-8 mr-3">
                      {step.id}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700">{step.description}</p>
                </div>
                <div className="flex-1 relative h-64 md:h-80">
                  <div className="relative h-full w-full">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
