import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const FloatingCTACard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        staggerChildren: 0.2
      }
    }
  } as const;

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  } as const;

  return (
    <div className="relative px-4 lg:px-6 pb-24">
      {/* Floating CTA Card */}
      <motion.div
        ref={ref}
        className="container mx-auto max-w-4xl relative z-20 -mb-32"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="relative overflow-hidden rounded-3xl shadow-2xl shadow-purple-500/10"
          style={{
            background: `linear-gradient(135deg, #f3f3ff 0%, #f0f0ee 100%)`,
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.15)"
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Background Patterns */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Moving Gradient Orbs */}
            <motion.div
              className="absolute w-96 h-96 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)",
                left: `${mousePosition.x - 48}%`,
                top: `${mousePosition.y - 48}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut" as const
              }}
            />

            {/* Subtle Wave Pattern */}
            <motion.div
              className="absolute top-0 right-0 w-full h-full opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear" as const
              }}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>

          <div className="relative grid lg:grid-cols-1 items-center gap-12 p-8 lg:p-16">
            {/* Content Section */}
            <motion.div className="space-y-8 text-center" variants={contentVariants}>
              <div className="space-y-6">
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                  variants={contentVariants}
                >
                  Transform Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
                    Financial Wellness
                  </span>
                </motion.h2>
                
                <motion.p 
                  className="text-gray-600 text-lg lg:text-xl font-medium"
                  variants={contentVariants}
                >
                  Join thousands of families who are taking control of their financial future with our innovative platform.
                </motion.p>
              </div>

              <motion.div variants={contentVariants}>
                <Button 
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Get started
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FloatingCTACard;