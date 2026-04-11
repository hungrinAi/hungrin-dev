/**
 * Central type re-exports.
 *
 * Import domain types from their feature directly for new code:
 *   import type { Order } from '@/src/features/orders/types'
 *
 * This file keeps backwards compatibility for any existing imports from '@/src/types'.
 */

export type { User } from './shared';

export type { DashboardStats }                from '@/src/features/dashboard/types';
export type { Customer, CustomerSummary }     from '@/src/features/customers/types';
export type { Order, OrderSummary }           from '@/src/features/orders/types';
export type { Campaign }                      from '@/src/features/campaigns/types';
export type { InsightsData, Recommendation, Product } from '@/src/features/insights/types';
