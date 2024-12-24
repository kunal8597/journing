'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface WavyCardProps {
  children: React.ReactNode;
  className?: string;
}

export function WavyCard({ children, className }: WavyCardProps) {
  return (
    <motion.div
      className={cn(
        "relative p-8 rounded-lg overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <motion.path
            d="M 0 50 C 20 30, 50 70, 100 50 L 100 100 L 0 100 Z"
            className="fill-blue-500/20"
            animate={{
              d: [
                "M 0 50 C 20 30, 50 70, 100 50 L 100 100 L 0 100 Z",
                "M 0 50 C 30 70, 70 30, 100 50 L 100 100 L 0 100 Z",
                "M 0 50 C 20 30, 50 70, 100 50 L 100 100 L 0 100 Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M 0 60 C 30 40, 60 80, 100 60 L 100 100 L 0 100 Z"
            className="fill-purple-500/20"
            animate={{
              d: [
                "M 0 60 C 30 40, 60 80, 100 60 L 100 100 L 0 100 Z",
                "M 0 60 C 40 80, 80 40, 100 60 L 100 100 L 0 100 Z",
                "M 0 60 C 30 40, 60 80, 100 60 L 100 100 L 0 100 Z",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

     
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}