'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_public: boolean;
}

export default function EntriesPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error fetching entries',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    setEntries(data);
  }

  async function deleteEntry(id: string) {
    const { error } = await supabase
      .from('journal_entries')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error deleting entry',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Entry deleted',
      description: 'Your journal entry has been deleted successfully.',
    });

    fetchEntries();
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Journal Entries</h1>
        <Link href="/new">
          <Button>New Entry</Button>
        </Link>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <Card key={entry.id} className="group">
            <Link href={`/entries/${entry.id}`}>
              <CardHeader>
                <CardTitle>{entry.title}</CardTitle>
                <CardDescription>
                  {format(new Date(entry.created_at), 'PPP')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{entry.content}</p>
              </CardContent>
            </Link>
            <CardContent className="border-t pt-4 mt-4">
              <div className="flex justify-end space-x-2">
                <Link href={`/edit/${entry.id}`}>
                  <Button variant="outline" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => deleteEntry(entry.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {entries.length === 0 && (
          <p className="text-muted-foreground col-span-full text-center py-12">
            No entries yet. Start writing your first journal entry!
          </p>
        )}
      </div>
    </div>
  );
}