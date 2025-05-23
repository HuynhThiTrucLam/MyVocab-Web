import { api } from '@/services/api-client';
import { Workspace, WorkspaceInput } from '../types';

const BASE_URL = '/dotnet/api/v1/Workspace';

/**
 * Service for workspace-related API operations
 */
export const workspaceService = {
  /**
   * Get all workspaces for the current user
   */
  getWorkspaces: () => {
    return api.get<Workspace[]>(BASE_URL);
  },

  /**
   * Get a specific workspace by ID
   */
  getWorkspace: (workspaceId: string) => {
    return api.get<Workspace>(`${BASE_URL}/${workspaceId}`);
  },

  /**
   * Create a new workspace
   */
  createWorkspace: (workspace: WorkspaceInput) => {
    return api.post<Workspace>(BASE_URL, workspace);
  },

  /**
   * Update an existing workspace
   */
  updateWorkspace: (workspaceId: string, workspace: WorkspaceInput) => {
    return api.put<Workspace>(`${BASE_URL}/${workspaceId}`, workspace);
  },

  /**
   * Delete a workspace
   */
  deleteWorkspace: (workspaceId: string) => {
    return api.delete<void>(`${BASE_URL}/${workspaceId}`);
  }
}; 