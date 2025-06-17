//import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const footerLinks = {
    About: ["Features", "Pricing", "Contact", "Blog"],
    Documentation: ["FAQ", "Support"],
    Social: ["X (Twitter)", "LinkedIn", "YouTube"]
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <footer ref={ref} className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden pt-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

      <motion.div
        className="relative container mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div className="lg:col-span-6" variants={itemVariants}>
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">Arth</span>
              </div>
              <span className="font-bold text-2xl tracking-tight">Saathi</span>
            </motion.div>
            
            <motion.div
              className="space-y-6"
              variants={itemVariants}
            >
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight max-w-lg">
                 The platform aims to empower users by providing them with the tools they need to achieve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  financial wellness
                </span>
              </h2>
              
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                 and make informed decisions about their financial future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
               
                
                <motion.button
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 font-medium px-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5" />
                  </div>
                  Watch how it works
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Links Section */}
          <motion.div 
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12"
            variants={itemVariants}
          >
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div 
                key={category}
                variants={linkVariants}
                custom={categoryIndex}
              >
                <h3 className="font-semibold text-white mb-6 text-lg">{category}</h3>
                <ul className="space-y-4">
                  {links.map((link, index) => (
                    <motion.li 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <a 
                        href="#" 
                        className="text-slate-400 hover:text-white transition-colors duration-300 text-base leading-relaxed block"
                      >
                        {link}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Status Indicator */}
        <motion.div
          className="flex items-center justify-between border-t border-slate-700/50 pt-8"
          variants={itemVariants}
        >
          


          <div className="flex items-center gap-8 text-sm text-slate-400">
            <span>© 2025 ArthSaathi. All rights reserved</span>
            <motion.a 
              href="#"
              className="hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#"
              className="hover:text-white transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Terms of Use
            </motion.a>
          </div>
        </motion.div>

      
      </motion.div>
    </footer>
  );
};

export default Footer;