export interface JournalEntry {
    id: string;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    is_public: boolean;
    user_id: string;
  }
  
  export interface ValidationResult {
    success: boolean;
    error?: string;
  }