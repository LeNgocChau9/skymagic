import React from 'react';
import { ShoppingBag, Ticket } from 'lucide-react';
import { EventBrandConfig, PageView } from '../types/esports';
import { EventLogoMark } from './EmblemMark';

interface TopBarProps {
  brand: EventBrandConfig;
  currentPage: PageView;
  cartCount: number;
  onNavigate: (page: PageView, sectionId?: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  brand,
  currentPage,
  cartCount,
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1360px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Top Left: Event Logo + Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          className="flex min-w-0 items-center gap-3 shrink-0 text-left transition-colors hover:text-amber-400 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
        >
          <EventLogoMark logoUrl={brand.eventLogoUrl} eventName={brand.eventName} />
          <span className="font-display text-xl font-bold tracking-tight text-slate-50 whitespace-nowrap shrink-0">
            {brand.eventName}
          </span>
        </button>

        {/* Center: Clean single-line navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
        >
          <button
            type="button"
            onClick={() => onNavigate('overview', 'gioi-thieu')}
            className={`transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 'overview' ? 'text-white' : 'text-slate-400'
            }`}
          >
            Giới thiệu
          </button>
          <button
            type="button"
            onClick={() => onNavigate('overview', 'lich-thi-dau')}
            className="text-slate-300 transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Lịch thi đấu
          </button>
          <button
            type="button"
            onClick={() => onNavigate('overview', 'doi-tuyen')}
            className="text-slate-300 transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Đội tuyển
          </button>
          <button
            type="button"
            onClick={() => onNavigate('overview', 'bang-xep-hang')}
            className="text-slate-300 transition-colors hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bảng xếp hạng
          </button>
        </nav>

        {/* Top Right: 2 Next-Page Action Buttons (Mua Vé & Merchandise) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('tickets')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              currentPage === 'tickets'
                ? 'bg-amber-500 text-[#09090B]'
                : 'border border-white/15 bg-[#14171F] text-slate-100 hover:border-amber-500/60 hover:text-amber-300'
            }`}
          >
            <Ticket className="h-4 w-4 shrink-0" />
            <span>Mua Vé</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('merch')}
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs sm:text-sm font-semibold text-[#09090B] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ShoppingBag className="h-4 w-4 shrink-0" />
            <span>Merchandise</span>
            {cartCount > 0 && (
              <span className="ml-0.5 rounded bg-[#09090B]/20 px-1.5 py-0.5 font-mono text-[11px] font-semibold tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
