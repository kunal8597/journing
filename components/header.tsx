'use client';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { BookText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <BookText className="h-10 w-10" />
          <span className="font-bold text-2xl"></span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link 
            href="/entries"
            className={cn(
              "text-m font-medium transition-colors hover:text-primary",
              pathname === "/entries" ? "text-primary" : "text-muted-foreground"
            )}
          >
            History
          </Link>
          <Link 
            href="/public-entry"
            className={cn(
              "text-m font-medium transition-colors hover:text-primary",
              pathname === "/public" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Explore
          </Link>
          <Link 
            href="/new"
            className={cn(
              "text-m font-medium transition-colors hover:text-primary",
              pathname === "/new" ? "text-primary" : "text-muted-foreground"
            )}
          >
            New Entry
          </Link>
          <Link 
            href="/contact"
            className={cn(
              "text-m font-medium transition-colors hover:text-primary",
              pathname === "/new" ? "text-primary" : "text-muted-foreground"
            )}
          >
            Contact Me
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}