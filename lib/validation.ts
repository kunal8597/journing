import type { ValidationResult } from './types';

const CONTENT_RULES = {
  MIN_TITLE_LENGTH: 3,
  MAX_TITLE_LENGTH: 100,
  MIN_CONTENT_LENGTH: 10,
  MAX_CONTENT_LENGTH: 10000,
  FORBIDDEN_WORDS: ['spam', 'hate', 'abuse'],
} as const;

interface EntryValidation {
  title: string;
  content: string;
  is_public: boolean;
}

export function validateEntry(entry: EntryValidation): ValidationResult {
  if (entry.title.length < CONTENT_RULES.MIN_TITLE_LENGTH) {
    return { 
      success: false, 
      error: `Title must be at least ${CONTENT_RULES.MIN_TITLE_LENGTH} characters` 
    };
  }

  if (entry.title.length > CONTENT_RULES.MAX_TITLE_LENGTH) {
    return { 
      success: false, 
      error: `Title must be less than ${CONTENT_RULES.MAX_TITLE_LENGTH} characters` 
    };
  }

  if (entry.content.length < CONTENT_RULES.MIN_CONTENT_LENGTH) {
    return { 
      success: false, 
      error: `Content must be at least ${CONTENT_RULES.MIN_CONTENT_LENGTH} characters` 
    };
  }

  if (entry.content.length > CONTENT_RULES.MAX_CONTENT_LENGTH) {
    return { 
      success: false, 
      error: `Content must be less than ${CONTENT_RULES.MAX_CONTENT_LENGTH} characters` 
    };
  }

  if (entry.is_public) {
    const hasInappropriateContent = CONTENT_RULES.FORBIDDEN_WORDS.some(word => 
      entry.title.toLowerCase().includes(word) || 
      entry.content.toLowerCase().includes(word)
    );
    
    if (hasInappropriateContent) {
      return { 
        success: false, 
        error: 'Content contains inappropriate language' 
      };
    }
  }

  return { success: true };
}