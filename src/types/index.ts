/**
 * Central type re-exports.
 *
 * Import domain types from their feature directly for new code:
 *   import type { Order } from '@/features/orders/types'
 *
 * This file keeps backwards compatibility for any existing imports from '@/types'.
 */

export type { User } from './shared';

export type { DashboardStats }                from '@/features/dashboard/types';
export type { Customer, CustomerSummary }     from '@/features/customers/types';
export type { Order, OrderSummary }           from '@/features/orders/types';
export type { Campaign }                      from '@/features/campaigns/types';
export type { InsightsData, Recommendation, Product } from '@/features/insights/types';
