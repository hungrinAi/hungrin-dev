export type ReportStatus = 'Pending' | 'Completed';
export type UploadTab = 'csv' | 'email';
export type ReportFilter = 'All' | 'Pending' | 'Completed';

export interface CsvReport {
  id: string;
  name: string;
  platform: string;
  date: string;
  size: string;
  status: ReportStatus;
}

export const PLATFORM_COLOR: Record<string, string> = {
  'Uber Eats': 'bg-black text-white',
  'Deliveroo': 'bg-[#00CCBC] text-white',
  'Just Eat':  'bg-[#FF8000] text-white',
};

export const MOCK_REPORTS: CsvReport[] = [
  { id: '1', name: 'uber-eats-apr-w2.csv', platform: 'Uber Eats', date: 'Apr 12, 2025', size: '48 KB', status: 'Completed' },
  { id: '2', name: 'deliveroo-apr-w2.csv', platform: 'Deliveroo', date: 'Apr 12, 2025', size: '61 KB', status: 'Pending'   },
  { id: '3', name: 'justeat-apr-w1.csv',   platform: 'Just Eat',  date: 'Apr 7, 2025',  size: '32 KB', status: 'Completed' },
  { id: '4', name: 'uber-eats-apr-w1.csv', platform: 'Uber Eats', date: 'Apr 7, 2025',  size: '52 KB', status: 'Completed' },
  { id: '5', name: 'deliveroo-mar-w4.csv', platform: 'Deliveroo', date: 'Mar 31, 2025', size: '57 KB', status: 'Pending'   },
];

export const HOW_IT_WORKS = [
  'Deliveroo, Uber Eats & Just Eat email reports to your inbox weekly',
  'Hungrin scans for CSV attachments and imports them automatically',
  'Your inbox credentials are never stored — read-only OAuth only',
];
