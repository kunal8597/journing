'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    is_public: boolean;
    user_id: string;
}

export default function EditEntryPage({ params }: { params: { id: string } }) {
    const [entry, setEntry] = useState<JournalEntry | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        async function fetchEntry() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/auth/login');
                return;
            }

            const { data, error } = await supabase
                .from('journal_entries')
                .select('*')
                .eq('id', params.id)
                .eq('user_id', user.id)
                .single();

            if (error || !data) {
                toast({
                    title: 'Error',
                    description: 'Entry not found or you don\'t have permission to edit it',
                    variant: 'destructive',
                });
                router.push('/entries');
                return;
            }

            setEntry(data);
            setTitle(data.title);
            setContent(data.content);
            setIsPublic(data.is_public);
            setLoading(false);
        }

        fetchEntry();
    }, [params.id, router, toast]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { error: updateError } = await supabase
                .from('journal_entries')
                .update({
                    title,
                    content,
                    is_public: isPublic,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', params.id)
                .eq('user_id', user.id);

            if (updateError) throw updateError;

            toast({
                title: 'Entry updated',
                description: 'Your journal entry has been updated successfully.',
            });

            router.push('/entries');
        } catch (error) {
            toast({
                title: 'Error updating entry',
                description: error instanceof Error ? error.message : 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Edit Journal Entry</h1>
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
                                Public entries are visible to all users and have additional content guidelines.
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
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
