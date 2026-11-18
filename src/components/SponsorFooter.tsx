import React from 'react';
import { Award } from 'lucide-react';
import { PageView, SiteCopyConfig, SponsorSlot } from '../types/esports';

interface SponsorFooterProps {
  siteCopy: SiteCopyConfig;
  sponsors: SponsorSlot[];
  onNavigate: (page: PageView) => void;
  onOpenStudio: () => void;
}

export const SponsorFooter: React.FC<SponsorFooterProps> = ({
  siteCopy,
  sponsors,
  onNavigate,
  onOpenStudio,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#0B0D12]">
      {/* 5 Main Sponsor Logo Slots */}
      <div className="mx-auto max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            {siteCopy.sponsorsTitle}
          </h2>
          <p className="mt-1 text-xs text-slate-400">{siteCopy.sponsorsSubtitle}</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-[#11131A] p-4 text-center"
            >
              <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#09090B] p-3">
                {sponsor.logoUrl ? (
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-slate-400">
                    <Award className="h-5 w-5 text-amber-400/80" />
                    <span className="font-mono text-[11px] tracking-wider">
                      SPONSOR 0{sponsor.slotIndex}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 w-full">
                <div className="truncate text-xs font-semibold text-slate-100">
                  {sponsor.name}
                </div>
                <div className="mt-0.5 truncate text-[11px] text-slate-400">
                  {sponsor.tierLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright + 4 Footer Buttons (Giới thiệu sự kiện, Mua Vé, Merchandise, SkyMagic Media) */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1360px] flex-col items-start justify-between gap-4 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>{siteCopy.footerCopyright}</div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => onNavigate('overview')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Giới thiệu sự kiện
            </button>
            <button
              type="button"
              onClick={() => onNavigate('tickets')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Mua Vé
            </button>
            <button
              type="button"
              onClick={() => onNavigate('merch')}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Merchandise
            </button>
            <button
              type="button"
              onClick={onOpenStudio}
              className="font-semibold text-amber-400 transition-colors hover:text-amber-300 whitespace-nowrap shrink-0 cursor-pointer"
            >
              SkyMagic Media
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
