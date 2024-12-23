'use client'
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import Footer from '@/components/footer';
import { Tiles } from '@/components/tiles';

export default function Home() {
  return (
    <AnimatedGridBackgroundSection>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-8 relative z-10 ">
        <div className="space-y-4">
          
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookText className="h-16 w-16 mx-auto text-primary" />
          </motion.div>

        
          <h1 className="text-5xl font-bold tracking-tighter">
  Welcome to{" "}
  <motion.span
    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    Journing!
  </motion.span>
</h1>

   
          <motion.p
            className="text-l text-muted-foreground max-w-[600px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            “Keeping a journal of what’s going on in your life is a good way to help you distill what’s important and what’s not.”
                        
                        
                        
                       <p>- Martina Navratilova</p>  
          </motion.p>
        </div>

       
        <div className="flex ">
          <motion.div
            initial={{ opacity: 0  }}
            animate={{ opacity: 1}}
            transition={{ duration: 1 }}
          >
            <Link href="/new">
              <Button size="lg" className="transition-all duration-200 ease-in-out transform hover:scale-105">
                Start Writing
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
           
          </motion.div>
        </div>

       
        <motion.div
          className="mt-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
           <Link href="/contact">
              <Button size="sm" variant="outline" className="transition-all duration-200 ease-in-out transform hover:scale-105">
                Contact Me
              </Button>
            </Link>
         
        </motion.div>
      </div>
      <div className="flex items-center justify-center mt-4">
  <p className="text-sm text-muted-foreground">
    Made by{' '}
    <a
      href="https://kunalm.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline hover:text-primary-hover"
    >
      Kunal Mathur
    </a>
  </p>
</div>

    </AnimatedGridBackgroundSection>
  );
}

const AnimatedGridBackgroundSection: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="w-full min-h-[88vh] overflow-hidden relative flex items-center justify-center shadow-md [mask-image:linear-gradient(to_right,transparent,black,black,black,black,black,transparent)] px-8 lg:px-0">
     
      <div className="w-fit h-fit relative z-[2]">{children}</div>

     
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Tiles rows={30} cols={20} />
      </div>
    </div>
  );
};

