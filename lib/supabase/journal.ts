import { supabase } from './config';
import type { Database } from './database.types';

type JournalEntry = Database['public']['Tables']['journal_entries']['Row'];
type NewJournalEntry = Omit<JournalEntry, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export async function createEntry(entry: NewJournalEntry, userId: string) {
  const { data, error } = await supabase
    .from('journal_entries')
    .insert([{ ...entry, user_id: userId }])
    .select()
    .single();

  return { data, error };
}

export async function getEntries(userId: string) {
  const { data, error } = await supabase
    .from('journal_entries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function updateEntry(id: string, entry: Partial<NewJournalEntry>, userId: string) {
  const { data, error } = await supabase
    .from('journal_entries')
    .update(entry)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  return { data, error };
}

export async function deleteEntry(id: string, userId: string) {
  const { error } = await supabase
    .from('journal_entries')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  return { error };
}