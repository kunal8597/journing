'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BookText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/footer';
import { Tiles } from '@/components/tiles';
import { supabase } from '@/lib/supabase/auth';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    }

    checkSession();
  }, []);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: 'Error logging out',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });

    setIsLoggedIn(false);
    router.push('/auth/login');
  }

  return (
    <AnimatedGridBackgroundSection>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BookText className="h-16 w-16 mx-auto text-primary" />
          </motion.div>

          <h1 className="text-5xl font-bold tracking-tighter">
            Welcome to{' '}
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
            <br />
            <span>- Martina Navratilova</span>
          </motion.p>
        </div>

        <div className="flex space-x-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Link href="/new">
              <Button
                size="lg"
                className="transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Start Writing
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              Log Out
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button
                size="sm"
                variant="outline"
                className="transition-all duration-200 ease-in-out transform hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          )}
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

const AnimatedGridBackgroundSection: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full min-h-[88vh] overflow-hidden relative flex items-center justify-center shadow-md [mask-image:linear-gradient(to_right,transparent,black,black,black,black,black,transparent)] px-8 lg:px-0">
      <div className="w-fit h-fit relative z-[2]">{children}</div>
      <div className="absolute top-0 left-0 h-full w-full z-0">
        <Tiles rows={30} cols={20} />
      </div>
    </div>
  );
};