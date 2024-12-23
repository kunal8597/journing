'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

// Import Supabase's User type
import { User } from '@supabase/auth-js';

interface PublicEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_id: string;
}

export default function PublicEntriesPage() {
  const [entries, setEntries] = useState<PublicEntry[]>([]);
  const [user, setUser] = useState<User | null>(null); // Typing the user state correctly
  const { toast } = useToast();

  useEffect(() => {
    // Fetch the current logged-in user
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user); // This now correctly uses the User type from Supabase
    }
    fetchUser();

    async function fetchPublicEntries() {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: 'Error fetching entries',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setEntries(data || []);
    }

    fetchPublicEntries();
  }, [toast]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold tracking-tight">Public Journals</h1>
        </div>
        <div className="flex justify-center">
          <p className="text-muted-foreground mt-2 align-middle">See what others feel.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Link href={`/entries/${entry.id}`} key={entry.id} passHref>
            <Card className="cursor-pointer">
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>
                  {format(new Date(entry.created_at), 'PPP')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{entry.content}</p>
              </CardContent>
            </Card>
          </Link>
        ))}

        {entries.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-12">
            No public entries yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
