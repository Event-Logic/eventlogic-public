/**
 * Supplier API client
 * Wrapper around supplier-collection backend endpoints
 */

import { apiClient } from './client';
import type {
  PotentialSupplier,
  SupplierListResponse,
  Category,
  QueueStatus,
  PipelineStats,
  CompleteSupplierResponse,
  MapSupplierData,
  ImageData,
  ProcessSupplierRequest,
  ProcessSupplierResponse,
  AIImageSelectRequest,
  AIImageSelectResponse,
} from '@/types/supplier';

export interface SearchSuppliersParams {
  search?: string;
  status?: string;
  country?: string;
  town?: string;
  category?: string;
  has_images?: boolean;
  has_selected_images?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchSuppliersResponse {
  total: number;
  offset: number;
  limit: number;
  suppliers: PotentialSupplier[];
}

export interface SupplierStatusResponse {
  supplier_id: number;
  current_stage: string;
  status: string;
  last_updated: string;
}

export interface SupplierDetailsResponse {
  supplier: PotentialSupplier;
  websites: any[];
  images: any[];
  resources: {
    conference_rooms: any[];
    restaurants: any[];
    accommodations: any[];
    activities: any[];
  };
}

export const suppliersAPI = {
  /**
   * Search suppliers with filters
   */
  async search(params: SearchSuppliersParams): Promise<SearchSuppliersResponse> {
    const response = await apiClient.post<any>('/api/suppliers/search', params);
    // API returns 'results' but we need 'suppliers'
    return {
      suppliers: response.results || [],
      total: response.total || 0,
      offset: params.offset || 0,
      limit: params.limit || 50,
    };
  },

  /**
   * Get supplier details by ID
   */
  async getDetails(supplierId: number): Promise<SupplierDetailsResponse> {
    return apiClient.post<SupplierDetailsResponse>('/api/suppliers/details', {
      supplier_id: supplierId,
    });
  },

  /**
   * Get supplier status
   */
  async getStatus(supplierId: number): Promise<SupplierStatusResponse> {
    return apiClient.post<SupplierStatusResponse>('/api/suppliers/status', {
      supplier_id: supplierId,
    });
  },

  /**
   * Get all categories
   */
  async getCategories(): Promise<Category[]> {
    return apiClient.get<Category[]>('/api/suppliers/categories');
  },

  /**
   * Approve a supplier (move to potential_suppliers)
   */
  async approve(supplierId: number): Promise<{ success: boolean; message: string }> {
    return apiClient.post('/api/suppliers/approve', {
      supplier_id: supplierId,
    });
  },

  /**
   * Process a supplier through the pipeline
   */
  async process(supplierId: number, stages?: string[]): Promise<{ success: boolean; message: string }> {
    return apiClient.post('/api/suppliers/process', {
      supplier_id: supplierId,
      stages,
    });
  },

  /**
   * Enrich supplier data
   */
  async enrich(
    supplierId: number,
    updates: Record<string, any>,
    resources?: any
  ): Promise<{ success: boolean; message: string }> {
    return apiClient.post('/api/suppliers/enrich', {
      supplier_id: supplierId,
      updates,
      resources,
    });
  },

  /**
   * Get queue status from monitoring endpoint
   */
  async getQueueStatus(): Promise<QueueStatus> {
    const stats = await apiClient.get<any>('/api/monitor/system');
    return {
      pending: stats.pending_count || 0,
      in_progress: stats.active_workers || 0,
      completed_today: stats.completed_count || 0,
      failed: stats.failed_count || 0,
      active_workers: stats.active_workers || 0,
      queue_depth: stats.total_queue_size || 0,
    };
  },

  /**
   * Get detailed queue stats
   */
  async getQueueStats(): Promise<any> {
    return apiClient.get('/api/monitor/stats');
  },

  /**
   * Get pipeline stats
   */
  async getPipelineStats(): Promise<PipelineStats[]> {
    // TODO: Implement actual pipeline stats aggregation
    return [];
  },

  // Admin endpoints
  /**
   * Get complete supplier data for admin view (ONE call with everything)
   */
  async getCompleteSupplier(supplierId: number): Promise<CompleteSupplierResponse> {
    return apiClient.get<CompleteSupplierResponse>(`/api/admin/suppliers/${supplierId}/complete`);
  },

  /**
   * Get map data with geographic filtering
   */
  async getMapData(params?: {
    status?: string;
    category?: string;
    north?: number;
    south?: number;
    east?: number;
    west?: number;
    limit?: number;
  }): Promise<MapSupplierData[]> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.north !== undefined) queryParams.append('north', params.north.toString());
    if (params?.south !== undefined) queryParams.append('south', params.south.toString());
    if (params?.east !== undefined) queryParams.append('east', params.east.toString());
    if (params?.west !== undefined) queryParams.append('west', params.west.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const url = `/api/admin/suppliers/map${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get<MapSupplierData[]>(url);
  },

  /**
   * Start processing a supplier
   */
  async processSupplier(
    supplierId: number,
    request: ProcessSupplierRequest
  ): Promise<ProcessSupplierResponse> {
    return apiClient.post<ProcessSupplierResponse>(
      `/api/admin/suppliers/${supplierId}/process`,
      request
    );
  },

  /**
   * Get all images for a supplier with complete metadata
   */
  async getSupplierImages(supplierId: number): Promise<ImageData[]> {
    return apiClient.get<ImageData[]>(`/api/admin/suppliers/${supplierId}/images/all`);
  },

  /**
   * AI-powered image selection
   */
  async aiSelectImages(
    supplierId: number,
    request: AIImageSelectRequest
  ): Promise<AIImageSelectResponse> {
    return apiClient.post<AIImageSelectResponse>(
      `/api/admin/suppliers/${supplierId}/images/ai-select`,
      request
    );
  },
};
