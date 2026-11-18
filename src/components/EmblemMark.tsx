import React from 'react';
import { Shield } from 'lucide-react';

interface TeamEmblemProps {
  logoUrl: string | null;
  tag: string;
  name: string;
  accentHex: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TeamEmblem: React.FC<TeamEmblemProps> = ({
  logoUrl,
  tag,
  name,
  accentHex,
  size = 'md',
}) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  const sizeClass =
    size === 'sm'
      ? 'h-8 w-8 text-[11px]'
      : size === 'lg'
        ? 'h-14 w-14 text-sm'
        : 'h-11 w-11 text-xs';

  if (logoUrl && !imgError) {
    return (
      <div
        className={`${sizeClass} shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#0B0D12] p-1 flex items-center justify-center`}
      >
        <img
          src={logoUrl}
          alt={`Logo ${name}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} relative shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#12151E] flex items-center justify-center font-display font-bold tracking-wider text-slate-100 select-none`}
      style={{
        boxShadow: `inset 0 0 0 1px ${accentHex}33`,
      }}
      aria-label={`Logo mặc định ${name}`}
    >
      <span
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ backgroundColor: accentHex }}
      />
      <span className="truncate px-1">{tag.slice(0, 4)}</span>
    </div>
  );
};

interface EventLogoMarkProps {
  logoUrl: string | null;
  eventName: string;
}

export const EventLogoMark: React.FC<EventLogoMarkProps> = ({ logoUrl, eventName }) => {
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [logoUrl]);

  if (logoUrl && !imgError) {
    return (
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-[#12151E] p-1 flex items-center justify-center">
        <img
          src={logoUrl}
          alt={`Logo ${eventName}`}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="h-10 w-10 shrink-0 rounded-lg border border-amber-500/40 bg-amber-500/10 flex items-center justify-center text-amber-400">
      <Shield className="h-5 w-5" />
    </div>
  );
};
