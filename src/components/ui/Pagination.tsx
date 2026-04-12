import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PaginationProps {
  /** Current active page (1-based) */
  page: number;
  /** Total number of pages */
  total: number;
  /** Called when the user selects a new page */
  onChange: (page: number) => void;
  /**
   * 'numbers' — show numbered page buttons (Campaigns-style)
   * 'simple'  — show ← Prev / Next → text buttons (Billing-style)
   * Defaults to 'numbers'
   */
  variant?: 'numbers' | 'simple';
  /** Optional result count label shown on the left */
  label?: React.ReactNode;
  className?: string;
}

/** Maximum numbered buttons shown before collapsing to ellipsis */
const MAX_VISIBLE = 5;

function pageRange(current: number, total: number): (number | '…')[] {
  if (total <= MAX_VISIBLE) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | '…')[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push('…');
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push('…');
  pages.push(total);
  return pages;
}

export function Pagination({ page, total, onChange, variant = 'numbers', label, className }: PaginationProps) {
  const atStart = page <= 1;
  const atEnd = page >= total;

  const btnBase =
    'inline-flex items-center justify-center font-bold transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none';

  if (variant === 'simple') {
    return (
      <div className={cn('flex items-center justify-between gap-3', className)}>
        <p className="text-xs text-text-muted">
          Page <strong className="text-text-dark">{page}</strong> of {total}
          {label && <span className="ml-1">{label}</span>}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => onChange(page - 1)}
            disabled={atStart}
            className={cn(
              btnBase,
              'px-3 py-1.5 text-[10px] bg-white border border-border-light rounded-lg text-text-muted hover:bg-g-pale'
            )}
          >
            ← Prev
          </button>
          <button
            onClick={() => onChange(page + 1)}
            disabled={atEnd}
            className={cn(
              btnBase,
              'px-3 py-1.5 text-[10px] bg-white border border-border-light rounded-lg text-text-mid hover:bg-g-pale'
            )}
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // 'numbers' variant
  const pages = pageRange(page, total);

  return (
    <div className={cn('flex items-center justify-between gap-3 flex-wrap', className)}>
      {label !== undefined ? (
        <p className="text-xs text-text-muted">{label}</p>
      ) : (
        <p className="text-xs text-text-muted">
          Page <strong className="text-text-dark">{page}</strong> of {total}
        </p>
      )}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onChange(page - 1)}
          disabled={atStart}
          className={cn(btnBase, 'p-2 border border-border-light rounded-lg bg-white text-text-muted hover:bg-g-pale')}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-xs text-text-muted select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                btnBase,
                'w-8 h-8 rounded-lg text-xs',
                p === page
                  ? 'bg-g-dark text-white shadow-sm'
                  : 'bg-white border border-border-light text-text-mid hover:bg-g-pale'
              )}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onChange(page + 1)}
          disabled={atEnd}
          className={cn(btnBase, 'p-2 border border-border-light rounded-lg bg-white text-text-mid hover:bg-g-pale')}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
