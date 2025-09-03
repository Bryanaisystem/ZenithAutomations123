import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "What is the return policy?",
    answer:
      "You can return any item within 30 days of purchase for a full refund, provided it is in its original condition.",
  },
  {
    id: "faq-2",
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website to track your order.",
  },
  {
    id: "faq-3",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    id: "faq-4",
    question: "Can I change my order after it has been placed?",
    answer:
      "You can change your order within 24 hours of placing it by contacting our customer service team.",
  },
  {
    id: "faq-5",
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    id: "faq-6",
    question: "How can I contact customer support?",
    answer:
      "You can reach our customer support team via email at support@example.com or by calling 1-800-123-4567.",
  },
  {
    id: "faq-7",
    question: "Are there any discounts for bulk purchases?",
    answer:
      "Yes, we offer discounts for bulk purchases. Please contact our sales team for more information.",
  },
];

const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our products. Can't find what you're looking for? Contact our support team.",
  items = faqItems,
  supportHeading = "Need more support?",
  supportDescription = "Our dedicated support team is here to help you with any questions or concerns. Get in touch with us for personalized assistance.",
  supportButtonText = "Contact Support",
  supportButtonUrl = "https://www.shadcnblocks.com",
}: Faq3Props) => {
  const navigate = useNavigate();

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/consultation');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="py-16 md:py-32 flex flex-col items-center">
      <div className="container space-y-10 md:space-y-16 max-w-4xl mx-auto">
        <div className="text-center px-4 md:px-0">
          <h2 className="mb-2 md:mb-4 text-2xl md:text-4xl font-semibold">
            {heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full px-4 md:px-0 accordion-item"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60 py-3 md:py-4">
                <div className="font-medium text-base md:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="mb-1 md:mb-2">
                <div className="text-muted-foreground text-sm md:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto flex max-w-3xl flex-col items-center rounded-lg bg-accent p-4 md:p-6 lg:p-8 text-center">
          <h3 className="mb-2 max-w-2xl font-semibold text-base md:text-lg">
            {supportHeading}
          </h3>
          <p className="mb-6 md:mb-8 max-w-2xl text-muted-foreground text-sm md:text-lg">
            {supportDescription}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
            <Button 
              className="w-full sm:w-auto py-2.5 px-4 md:py-3 md:px-6 text-sm md:text-base" 
              onClick={handleContactClick}
            >
              {supportButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Faq3 };