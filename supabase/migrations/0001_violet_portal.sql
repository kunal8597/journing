/*
  # Journal App Schema

  1. New Tables
    - `journal_entries`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `is_public` (boolean)

  2. Security
    - Enable RLS on `journal_entries` table
    - Add policies for CRUD operations
*/

CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_public boolean DEFAULT false
);

ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own entries and public entries
CREATE POLICY "Users can read own entries and public ones"
  ON journal_entries
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR is_public = true
  );

-- Policy: Users can insert their own entries
CREATE POLICY "Users can insert own entries"
  ON journal_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own entries
CREATE POLICY "Users can update own entries"
  ON journal_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own entries
CREATE POLICY "Users can delete own entries"
  ON journal_entries
  FOR DELETE
  USING (auth.uid() = user_id);