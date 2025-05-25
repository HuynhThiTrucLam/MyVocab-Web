import { api } from '@/services/api-client';
import { VocabularyItem } from '../types';

const BASE_URL = '/api/v1/Dictionary';

/**
 * Service for vocabulary-related API operations
 */
export const vocabularyService = {
  /**
   * Fetch vocabulary items for a workspace
   */
  getVocabularyItems: (workspaceId: string) => {
    return api.get<VocabularyItem[]>(`${BASE_URL}/${workspaceId}`);
  },

  /**
   * Get details for a specific vocabulary item
   */
  getVocabularyItem: (itemId: string) => {
    return api.get<VocabularyItem>(`${BASE_URL}/item/${itemId}`);
  },

  /**
   * Delete a vocabulary item
   */
  deleteVocabularyItem: (itemId: string) => {
    return api.delete<void>(`${BASE_URL}/${itemId}`);
  },

  /**
   * Create a new vocabulary item
   */
  createVocabularyItem: (workspaceId: string, item: Omit<VocabularyItem, 'id'>) => {
    return api.post<VocabularyItem>(`${BASE_URL}/${workspaceId}`, item);
  },

  /**
   * Update a vocabulary item
   */
  updateVocabularyItem: (itemId: string, item: Partial<VocabularyItem>) => {
    return api.put<VocabularyItem>(`${BASE_URL}/${itemId}`, item);
  },

  /**
   * Search for vocabulary items
   */
  searchVocabulary: (query: string) => {
    return api.get<VocabularyItem[]>(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  }
}; 