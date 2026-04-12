/**
 * @deprecated
 * Service layer has moved into feature modules.
 * Use feature APIs directly:
 *   import { dashboardApi } from '@/features/dashboard'
 *   import { ordersApi }    from '@/features/orders'
 *   import { customersApi } from '@/features/customers'
 *   import { campaignsApi } from '@/features/campaigns'
 *   import { insightsApi }  from '@/features/insights'
 *
 * These re-exports exist only to avoid breaking any remaining imports.
 */
import { dashboardApi } from '@/features/dashboard/api';
import { ordersApi }    from '@/features/orders/api';
import { customersApi } from '@/features/customers/api';
import { campaignsApi } from '@/features/campaigns/api';
import { insightsApi }  from '@/features/insights/api';

export const dashboardService = dashboardApi;
export const insightsService  = { getInsights: insightsApi.getAll };
export const orderService     = ordersApi;
export const campaignService  = campaignsApi;
export const customerService  = customersApi;
