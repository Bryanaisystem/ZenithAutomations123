import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Link, useNavigate } from "react-router-dom";

interface ServicePlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface ServicesProps {
  plans: ServicePlan[];
  title?: string;
  description?: string;
}

export function Services({
  plans,
  title = "Our Services",
  description = "Every day without automation is a step behind the competition. In today's digital landscape, growth depends on smarter, faster solutions. Choose the service that will propel your business forward",
}: ServicesProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLearnMore = (href: string) => {
    navigate('/services-info');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 px-4 md:px-0">
      <motion.div 
        className="text-center space-y-4 mb-10 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-light tracking-wider sm:text-4xl text-center">
          {title}
        </h2>
        <p className="text-gray-400 text-base md:text-lg whitespace-pre-line text-center">
          {description}
        </p>
      </motion.div>

      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[90%] mx-auto" 
        ref={containerRef}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            layout
            whileHover={{ 
              y: -8, 
              transition: { 
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 1,
                velocity: 2,
                restDelta: 0.001
              }
            }}
            animate={{ 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 800,
                damping: 35,
                mass: 0.8,
                restDelta: 0.001
              }
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              type: "spring",
              stiffness: 200,
              damping: 25
            }}
            className={cn(
              "service-card group relative rounded-2xl p-5 backdrop-blur-sm flex flex-col h-full",
              "transition-all duration-150",
              "bg-gradient-to-b from-white/[0.08] to-transparent",
              "before:absolute before:inset-0 before:rounded-2xl before:p-[1px]",
              "before:bg-gradient-to-b before:from-white/10 before:to-transparent",
              "before:transition-all before:duration-200",
              "after:absolute after:inset-[1px] after:rounded-2xl after:bg-black/90 after:-z-10",
              "hover:before:opacity-100 hover:before:blur-none",
              "hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            )}
            style={{ 
              transform: "translateZ(0)", 
              willChange: "transform, opacity",
              perspective: "1000px",
              backfaceVisibility: "hidden"
            }}
          >
            <motion.div 
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 blur-lg bg-gradient-to-b from-white/20 to-transparent -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="flex-1 relative z-10">
              <p className="text-lg font-semibold text-white text-center mb-6">
                {index === 1 ? "CRM INTEGRATION" : plan.name}
              </p>

              <ul className="mt-6 space-y-3 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-white mt-1 flex-shrink-0" />
                    <span className="text-left text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 relative z-10 space-y-3">
              <hr className="w-full border-white/10 mb-3" />

              <button
                onClick={() => handleLearnMore(plan.href)}
                className={cn(
                  "w-full inline-flex items-center justify-center",
                  "px-4 py-2 rounded-lg text-sm font-bold tracking-tight",
                  "bg-transparent text-white border border-white/20",
                  "transition-all duration-300 ease-out",
                  "hover:border-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]",
                  "transform hover:-translate-y-[2px]"
                )}
              >
                Learn More
              </button>

              <Link
                to="/consultation"
                className={cn(
                  "w-full inline-flex items-center justify-center",
                  "px-4 py-2 rounded-lg text-sm font-bold tracking-tight",
                  "bg-white text-black border-2 border-transparent",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-[0_0_15px_rgba(255,255,255,0.7)]",
                  "transform hover:-translate-y-[2px]"
                )}
              >
                GET STARTED
              </Link>

              <p className="mt-4 text-xs leading-5 text-gray-400 text-center">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}