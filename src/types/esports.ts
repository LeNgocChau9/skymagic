export type PageView = 'overview' | 'tickets' | 'merch';

export type GameTitle = 'free-fire' | 'aov';

export type FreeFireGroup = 'A' | 'B' | 'C';

export interface EventBrandConfig {
  eventName: string;
  eventLogoUrl: string | null;
  posterUrl: string;
  introLarge: string;
  introMedium: string;
  introSmall: string;
}

export interface EventFactItem {
  id: string;
  label: string;
  value: string;
}

export interface SiteCopyConfig {
  heroCtaLabel: string;
  facts: EventFactItem[];
  scheduleKicker: string;
  scheduleTitle: string;
  scheduleSubtitle: string;
  teamsKicker: string;
  teamsTitle: string;
  teamsSubtitle: string;
  standingsKicker: string;
  standingsTitle: string;
  sponsorsTitle: string;
  sponsorsSubtitle: string;
  footerCopyright: string;
  ticketsTitle: string;
  ticketsVenue: string;
  merchTitle: string;
  merchSubtitle: string;
}

export interface SponsorSlot {
  id: string;
  slotIndex: number;
  name: string;
  tierLabel: string;
  logoUrl: string | null;
}

export interface ScheduleItem {
  id: string;
  phaseKey: 'ff-group' | 'ff-final' | 'aov-stage1' | 'aov-swiss';
  dayLabel: string;
  date: string;
  time: string;
  game: GameTitle;
  gameLabel: string;
  stage: string;
  format: string;
  arena: string;
  matchupSummary: string;
}

export interface TeamEntry {
  id: string;
  name: string;
  tag: string;
  game: GameTitle;
  group?: FreeFireGroup;
  seed: number;
  region: string;
  captain: string;
  accentHex: string;
  logoUrl: string | null;
}

export interface FreeFireStandingRow {
  teamId: string;
  matches: number;
  booyah: number;
  placementPts: number;
  killPts: number;
}

export interface AovStage1StandingRow {
  teamId: string;
  played: number;
  wins: number;
  losses: number;
  gameDiff: number;
  points: number;
}

export interface AovMatchEntry {
  id: string;
  stage: 'stage1' | 'swiss';
  roundLabel: string;
  bestOf: 'Bo3' | 'Bo5';
  scheduleTime: string;
  teamAId: string | null;
  teamBId: string | null;
  teamAPlaceholder?: string;
  teamBPlaceholder?: string;
  scoreA: number | null;
  scoreB: number | null;
}

export interface TicketTier {
  id: string;
  name: string;
  zone: string;
  priceVnd: number;
  perks: string[];
  remaining: number;
}

export interface TicketDayOption {
  id: string;
  label: string;
  desc: string;
  multiplier: number;
}

export interface MerchProduct {
  id: string;
  category: string;
  name: string;
  priceVnd: number;
  imageUrl: string;
  description: string;
  sizes: string[];
  availabilityNote: string;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

export type StudioTab =
  | 'brand-text'
  | 'schedule'
  | 'teams'
  | 'standings'
  | 'tickets'
  | 'merch'
  | 'sponsors';
