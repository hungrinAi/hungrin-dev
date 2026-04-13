/**
 * Mock / fallback data for all API routes.
 *
 * These re-export from the feature-level mock files so there is
 * one canonical source of truth per feature — no duplication.
 *
 * API routes call `isMockMode()` first. If the env flag is set they
 * return immediately (no DB connection attempted, zero latency).
 * When the flag is absent they attempt the real DB; on failure they
 * fall back to this data automatically.
 */

// ─── Mock-mode flag ────────────────────────────────────────────────────────────

/**
 * Returns true when the USE_MOCK_DATA env variable is set to "true".
 * Set USE_MOCK_DATA=true in .env.local while MongoDB Atlas is unreachable
 * (IP not yet whitelisted). Remove it once the IP is whitelisted and the
 * real DB should be used.
 */
export function isMockMode(): boolean {
  return process.env.USE_MOCK_DATA === 'true';
}

// ─── Feature mock re-exports ───────────────────────────────────────────────────

export { mockDashboardStats  as MOCK_DASHBOARD_STATS  } from '@/src/features/dashboard/data/mock';
export { mockOrderSummary    as MOCK_ORDERS_SUMMARY    } from '@/src/features/orders/data/mock';
export { mockCustomerSummary as MOCK_CUSTOMERS_SUMMARY } from '@/src/features/customers/data/mock';
export { mockCampaigns       as MOCK_CAMPAIGNS         } from '@/src/features/campaigns/data/mock';
export { mockInsights        as MOCK_INSIGHTS          } from '@/src/features/insights/data/mock';
