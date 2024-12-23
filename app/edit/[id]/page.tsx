'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { EntryForm } from '@/components/entry-form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { JournalEntry } from '@/lib/types';

export default function EditEntryPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [entry, setEntry] = useState<JournalEntry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      <h1 className="text-3xl font-bold tracking-tight">Edit Entry</h1>
      <EntryForm 
        initialData={entry}
        onSuccess={() => {
          router.push(`/entries/${entry.id}`);
        }}
      />
    </div>
  );
}