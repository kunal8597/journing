'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function NewEntryPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Get the currently logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setIsSubmitting(false);
      toast({
        title: 'Error',
        description: 'Unable to fetch user. Please log in and try again.',
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase
      .from('journal_entries')
      .insert([
        {
          title,
          content,
          is_public: isPublic,
          user_id: user.id, // Include user_id in the payload
        },
      ]);

    setIsSubmitting(false);

    if (error) {
      toast({
        title: 'Error creating entry',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Entry created',
      description: 'Your journal entry has been saved successfully.',
    });

    router.push('/entries');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="flex justify-center ">
  <h1 className="text-3xl font-bold tracking-tight text-center">New Journal Entry</h1>
</div>

      
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
            className="min-h-[350px]"
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
            {isSubmitting ? 'Saving...' : 'Save Entry'}
          </Button>
        </div>
      </form>
    </div>
  );
}
