import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";

// eslint-disable-next-line react-refresh/only-export-components
export const faqData: { question: string; answer: string }[] = [
  {
    question: "How do I enroll in a course?",
    answer:
      "To enroll in a course, first create an account or log in. Then navigate to the course you want to enroll in, click 'Add to Cart', and proceed to checkout. Once the payment is confirmed, you'll be enrolled and can access the course materials.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept multiple payment methods including credit/debit cards (Visa, MasterCard), PayPal, and bank transfers. Payment options are displayed during checkout for your convenience.",
  },
  {
    question: "Can I get a refund if I cancel?",
    answer:
      "Refund policies depend on the course. Typically, you can request a refund within 7 days of enrollment if you haven't accessed the course. Please check the specific course's refund policy before enrolling.",
  },
  {
    question: "Do I need any prior experience to join a course?",
    answer:
      "Most courses are designed for beginners, but some advanced courses may require prior knowledge. Each course page lists prerequisites so you can ensure you meet the requirements.",
  },
  {
    question: "How long do I have access to the course materials?",
    answer:
      "Once enrolled, you typically have lifetime access to the course materials, including any updates or additional resources that are added in the future.",
  },
  {
    question: "Will I receive a certificate after completing a course?",
    answer:
      "Yes! Upon successfully completing a course, you'll receive a digital certificate that you can download and share on professional networks or include in your resume.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Absolutely. Our platform is fully responsive, so you can access courses on desktop, tablet, or mobile devices without any limitations.",
  },
  {
    question: "Who can I contact if I face issues with a course?",
    answer:
      "If you encounter any issues, you can contact our support team via the 'Contact Us' page. Provide your course details and issue description, and our team will assist you promptly.",
  },
];

const FAQPage = () => {
  let isLoading;
  return (
    <div className="bg-violet-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <TitleSubTitle
          title="Frequently Asked Questions"
          subtitle="We’ve got answers! Explore the most common questions!"
        />

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-4 animate-pulse"
              >
                <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-5/6 mt-1 rounded" />
              </div>
            ))}
          </div>
        ) : (
          // Accordion for FAQ items
          <Accordion type="single" collapsible className="mt-8 space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <AccordionTrigger
                  className="text-gray-900 dark:text-white font-semibold text-lg sm:text-xl 
             px-4 py-3 sm:px-6 sm:py-4 cursor-pointer no-underline hover:text-violet-600 dark:hover:text-violet-300 transition"
                >
                  {item.question}
                </AccordionTrigger>

                <AccordionContent
                  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-4 
             bg-gray-50 dark:bg-gray-800 rounded-b-lg transition-colors duration-200"
                >
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default FAQPage;
