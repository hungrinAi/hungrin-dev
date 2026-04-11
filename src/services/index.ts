/**
 * @deprecated
 * Service layer has moved into feature modules.
 * Use feature APIs directly:
 *   import { dashboardApi } from '@/src/features/dashboard'
 *   import { ordersApi }    from '@/src/features/orders'
 *   import { customersApi } from '@/src/features/customers'
 *   import { campaignsApi } from '@/src/features/campaigns'
 *   import { insightsApi }  from '@/src/features/insights'
 *
 * These re-exports exist only to avoid breaking any remaining imports.
 */
import { dashboardApi } from '@/src/features/dashboard/api';
import { ordersApi }    from '@/src/features/orders/api';
import { customersApi } from '@/src/features/customers/api';
import { campaignsApi } from '@/src/features/campaigns/api';
import { insightsApi }  from '@/src/features/insights/api';

export const dashboardService = dashboardApi;
export const insightsService  = { getInsights: insightsApi.getAll };
export const orderService     = ordersApi;
export const campaignService  = campaignsApi;
export const customerService  = customersApi;
