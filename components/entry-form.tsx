'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { JournalEntry } from '@/lib/types';
import { validateEntry } from '@/lib/validation';

interface EntryFormProps {
  initialData?: JournalEntry;
  onSuccess?: () => void;
}

export function EntryForm({ initialData, onSuccess }: EntryFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [isPublic, setIsPublic] = useState(initialData?.is_public ?? false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validation = validateEntry({ title, content, is_public: isPublic });
      if (!validation.success) {
        throw new Error(validation.error);
      }

      const { error } = initialData 
        ? await supabase
            .from('journal_entries')
            .update({
              title,
              content,
              is_public: isPublic,
              updated_at: new Date().toISOString(),
            })
            .eq('id', initialData.id)
        : await supabase
            .from('journal_entries')
            .insert([{ title, content, is_public: isPublic }]);

      if (error) throw error;

      toast({
        title: initialData ? 'Entry updated' : 'Entry created',
        description: initialData 
          ? 'Your journal entry has been updated successfully.'
          : 'Your journal entry has been saved successfully.',
      });

      if (onSuccess) {
        onSuccess();
      } else {
        router.push('/entries');
      }
    } catch (error) {
      toast({
        title: initialData ? 'Error updating entry' : 'Error creating entry',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your entry"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Entry</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="How are you feeling today?"
          className="min-h-[300px]"
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="public"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <div>
          <Label htmlFor="public">Make this entry public</Label>
          {isPublic && (
            <p className="text-sm text-muted-foreground mt-1">
              Public entries are visible to all users and have additional content guidelines
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (initialData ? 'Saving...' : 'Creating...') : (initialData ? 'Save Changes' : 'Create Entry')}
        </Button>
      </div>
    </form>
  );
}