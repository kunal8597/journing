'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Use Supabase's User type directly
import { User } from '@supabase/auth-js'; 

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  user_id: string; // Added user_id to check the creator of the entry
}

export default function EntryPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Use Supabase User type

  useEffect(() => {
    // Fetch the current logged-in user
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user); // This will now work with the Supabase User type
    }
    fetchUser();

    async function fetchEntry() {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        toast({
          title: 'Error fetching entry',
          description: error.message,
          variant: 'destructive',
        });
        router.push('/entries');
        return;
      }

      setEntry(data);
      setLoading(false);
    }

    fetchEntry();
  }, [params.id, router, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!entry) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {/* Conditionally render the Edit button */}
        {user && user.id === entry.user_id && (
          <Link href={`/edit/${entry.id}`}>
            <Button variant="outline">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Entry
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{entry.title}</CardTitle>
          <CardDescription>
            Created on {format(new Date(entry.created_at), 'PPP')}
            {entry.updated_at !== entry.created_at && 
              ` • Updated on ${format(new Date(entry.updated_at), 'PPP')}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {entry.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
