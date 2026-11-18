import { useEffect, useState } from 'react';
import { MerchPage } from './components/MerchPage';
import { OverviewPage } from './components/OverviewPage';
import { SiteStudioModal } from './components/SiteStudioModal';
import { SponsorFooter } from './components/SponsorFooter';
import { TicketsPage } from './components/TicketsPage';
import { TopBar } from './components/TopBar';
import {
  DEFAULT_AOV_MATCHES,
  DEFAULT_AOV_STAGE1_STANDINGS,
  DEFAULT_AOV_TEAMS,
  DEFAULT_BRAND_CONFIG,
  DEFAULT_FF_FINAL_STANDINGS,
  DEFAULT_FF_GROUP_STANDINGS,
  DEFAULT_FREE_FIRE_TEAMS,
  DEFAULT_MERCH_PRODUCTS,
  DEFAULT_SITE_COPY,
  DEFAULT_SPONSORS,
  DEFAULT_TICKET_DAYS,
  DEFAULT_TICKET_TIERS,
  DEFAULT_TOURNAMENT_SCHEDULE,
} from './data/tournamentData';
import {
  AovMatchEntry,
  AovStage1StandingRow,
  CartItem,
  EventBrandConfig,
  FreeFireStandingRow,
  MerchProduct,
  PageView,
  ScheduleItem,
  SiteCopyConfig,
  SponsorSlot,
  TeamEntry,
  TicketDayOption,
  TicketTier,
} from './types/esports';

const STORAGE_KEYS = {
  brand: 'skymagic_esports_brand_v3',
  siteCopy: 'skymagic_esports_copy_v3',
  schedule: 'skymagic_esports_schedule_v3',
  sponsors: 'skymagic_esports_sponsors_v3',
  ffTeams: 'skymagic_esports_ff_teams_v3',
  aovTeams: 'skymagic_esports_aov_teams_v3',
  ffGroupStandings: 'skymagic_esports_ff_group_v3',
  ffFinalStandings: 'skymagic_esports_ff_final_v3',
  aovStage1Standings: 'skymagic_esports_aov_stage1_v3',
  aovMatches: 'skymagic_esports_aov_matches_v3',
  aovFinalists: 'skymagic_esports_aov_finalists_v3',
  ticketDays: 'skymagic_esports_ticket_days_v3',
  ticketTiers: 'skymagic_esports_ticket_tiers_v3',
  merchProducts: 'skymagic_esports_merch_v3',
  cart: 'skymagic_esports_cart_v3',
};

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeStoredJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

function getInitialPageFromUrl(): PageView {
  try {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    if (page === 'tickets' || page === 'merch') {
      return page;
    }
  } catch {
    // Ignore URL parse errors
  }
  return 'overview';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(() => getInitialPageFromUrl());

  const [brand, setBrand] = useState<EventBrandConfig>(() =>
    readStoredJson<EventBrandConfig>(STORAGE_KEYS.brand, DEFAULT_BRAND_CONFIG)
  );
  const [siteCopy, setSiteCopy] = useState<SiteCopyConfig>(() =>
    readStoredJson<SiteCopyConfig>(STORAGE_KEYS.siteCopy, DEFAULT_SITE_COPY)
  );
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() =>
    readStoredJson<ScheduleItem[]>(STORAGE_KEYS.schedule, DEFAULT_TOURNAMENT_SCHEDULE)
  );
  const [sponsors, setSponsors] = useState<SponsorSlot[]>(() =>
    readStoredJson<SponsorSlot[]>(STORAGE_KEYS.sponsors, DEFAULT_SPONSORS)
  );
  const [freeFireTeams, setFreeFireTeams] = useState<TeamEntry[]>(() =>
    readStoredJson<TeamEntry[]>(STORAGE_KEYS.ffTeams, DEFAULT_FREE_FIRE_TEAMS)
  );
  const [aovTeams, setAovTeams] = useState<TeamEntry[]>(() =>
    readStoredJson<TeamEntry[]>(STORAGE_KEYS.aovTeams, DEFAULT_AOV_TEAMS)
  );
  const [ffGroupStandings, setFfGroupStandings] = useState<FreeFireStandingRow[]>(() =>
    readStoredJson<FreeFireStandingRow[]>(
      STORAGE_KEYS.ffGroupStandings,
      DEFAULT_FF_GROUP_STANDINGS
    )
  );
  const [ffFinalStandings, setFfFinalStandings] = useState<FreeFireStandingRow[]>(() =>
    readStoredJson<FreeFireStandingRow[]>(
      STORAGE_KEYS.ffFinalStandings,
      DEFAULT_FF_FINAL_STANDINGS
    )
  );
  const [aovStage1Standings, setAovStage1Standings] = useState<AovStage1StandingRow[]>(() =>
    readStoredJson<AovStage1StandingRow[]>(
      STORAGE_KEYS.aovStage1Standings,
      DEFAULT_AOV_STAGE1_STANDINGS
    )
  );
  const [aovMatches, setAovMatches] = useState<AovMatchEntry[]>(() =>
    readStoredJson<AovMatchEntry[]>(STORAGE_KEYS.aovMatches, DEFAULT_AOV_MATCHES)
  );
  const [aovFinalistIds, setAovFinalistIds] = useState<string[]>(() =>
    readStoredJson<string[]>(STORAGE_KEYS.aovFinalists, ['aov-1', 'aov-2', 'aov-3'])
  );
  const [ticketDays, setTicketDays] = useState<TicketDayOption[]>(() =>
    readStoredJson<TicketDayOption[]>(STORAGE_KEYS.ticketDays, DEFAULT_TICKET_DAYS)
  );
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>(() =>
    readStoredJson<TicketTier[]>(STORAGE_KEYS.ticketTiers, DEFAULT_TICKET_TIERS)
  );
  const [merchProducts, setMerchProducts] = useState<MerchProduct[]>(() =>
    readStoredJson<MerchProduct[]>(STORAGE_KEYS.merchProducts, DEFAULT_MERCH_PRODUCTS)
  );
  const [cart, setCart] = useState<CartItem[]>(() =>
    readStoredJson<CartItem[]>(STORAGE_KEYS.cart, [])
  );

  const [studioOpen, setStudioOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPage(getInitialPageFromUrl());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const pageTitles: Record<PageView, string> = {
      overview: `${brand.eventName} – Giải Đấu Free Fire & AoV`,
      tickets: `Mua Vé Tham Dự – ${brand.eventName}`,
      merch: `Cửa Hàng Merchandise – ${brand.eventName}`,
    };
    document.title = pageTitles[currentPage];

    const canonicalOrigin = 'https://skymagicmedia.vn';
    const canonicalUrl =
      currentPage === 'overview'
        ? `${canonicalOrigin}/`
        : `${canonicalOrigin}/?page=${currentPage}`;

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    let ogUrlMeta = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.content = canonicalUrl;
  }, [currentPage, brand.eventName]);

  useEffect(() => writeStoredJson(STORAGE_KEYS.brand, brand), [brand]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.siteCopy, siteCopy), [siteCopy]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.schedule, schedule), [schedule]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.sponsors, sponsors), [sponsors]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.ffTeams, freeFireTeams), [freeFireTeams]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.aovTeams, aovTeams), [aovTeams]);
  useEffect(
    () => writeStoredJson(STORAGE_KEYS.ffGroupStandings, ffGroupStandings),
    [ffGroupStandings]
  );
  useEffect(
    () => writeStoredJson(STORAGE_KEYS.ffFinalStandings, ffFinalStandings),
    [ffFinalStandings]
  );
  useEffect(
    () => writeStoredJson(STORAGE_KEYS.aovStage1Standings, aovStage1Standings),
    [aovStage1Standings]
  );
  useEffect(() => writeStoredJson(STORAGE_KEYS.aovMatches, aovMatches), [aovMatches]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.aovFinalists, aovFinalistIds), [aovFinalistIds]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.ticketDays, ticketDays), [ticketDays]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.ticketTiers, ticketTiers), [ticketTiers]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.merchProducts, merchProducts), [merchProducts]);
  useEffect(() => writeStoredJson(STORAGE_KEYS.cart, cart), [cart]);

  const handleNavigate = (page: PageView, sectionId?: string) => {
    setCurrentPage(page);
    const nextUrl =
      page === 'overview'
        ? `${window.location.pathname}${sectionId ? `#${sectionId}` : ''}`
        : `${window.location.pathname}?page=${page}`;
    window.history.pushState({}, '', nextUrl);

    if (page === 'overview' && sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleUpdateSponsor = (sponsorId: string, patch: Partial<SponsorSlot>) => {
    setSponsors((prev) =>
      prev.map((slot) => (slot.id === sponsorId ? { ...slot, ...patch } : slot))
    );
  };

  const handleUpdateTeam = (teamId: string, patch: Partial<TeamEntry>) => {
    setFreeFireTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, ...patch } : t))
    );
    setAovTeams((prev) => prev.map((t) => (t.id === teamId ? { ...t, ...patch } : t)));
  };

  const handleUpdateFfGroupStanding = (
    teamId: string,
    patch: Partial<FreeFireStandingRow>
  ) => {
    setFfGroupStandings((prev) =>
      prev.map((row) => (row.teamId === teamId ? { ...row, ...patch } : row))
    );
  };

  const handleSyncTop12ToFinals = () => {
    const top12 = [...ffGroupStandings]
      .sort((a, b) => b.placementPts + b.killPts - (a.placementPts + a.killPts))
      .slice(0, 12);
    setFfFinalStandings(
      top12.map((row) => ({
        teamId: row.teamId,
        matches: 0,
        booyah: 0,
        placementPts: 0,
        killPts: 0,
      }))
    );
  };

  const handleUpdateFfFinalStanding = (
    teamId: string,
    patch: Partial<FreeFireStandingRow>
  ) => {
    setFfFinalStandings((prev) =>
      prev.map((row) => (row.teamId === teamId ? { ...row, ...patch } : row))
    );
  };

  const handleSwapFfFinalTeam = (index: number, newTeamId: string) => {
    setFfFinalStandings((prev) =>
      prev.map((row, idx) => (idx === index ? { ...row, teamId: newTeamId } : row))
    );
  };

  const handleZeroFfFinals = () => {
    setFfFinalStandings((prev) =>
      prev.map((row) => ({
        ...row,
        matches: 0,
        booyah: 0,
        placementPts: 0,
        killPts: 0,
      }))
    );
  };

  const handleUpdateAovStage1Standing = (
    teamId: string,
    patch: Partial<AovStage1StandingRow>
  ) => {
    setAovStage1Standings((prev) =>
      prev.map((row) => (row.teamId === teamId ? { ...row, ...patch } : row))
    );
  };

  const handleUpdateAovMatch = (matchId: string, patch: Partial<AovMatchEntry>) => {
    setAovMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, ...patch } : m))
    );
  };

  const handleResetAll = () => {
    setBrand(DEFAULT_BRAND_CONFIG);
    setSiteCopy(DEFAULT_SITE_COPY);
    setSchedule(DEFAULT_TOURNAMENT_SCHEDULE);
    setSponsors(DEFAULT_SPONSORS);
    setFreeFireTeams(DEFAULT_FREE_FIRE_TEAMS);
    setAovTeams(DEFAULT_AOV_TEAMS);
    setFfGroupStandings(DEFAULT_FF_GROUP_STANDINGS);
    setFfFinalStandings(DEFAULT_FF_FINAL_STANDINGS);
    setAovStage1Standings(DEFAULT_AOV_STAGE1_STANDINGS);
    setAovMatches(DEFAULT_AOV_MATCHES);
    setAovFinalistIds(['aov-1', 'aov-2', 'aov-3']);
    setTicketDays(DEFAULT_TICKET_DAYS);
    setTicketTiers(DEFAULT_TICKET_TIERS);
    setMerchProducts(DEFAULT_MERCH_PRODUCTS);
  };

  const handleAddToCart = (productId: string, size: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === productId && item.size === size
      );
      if (existingIndex >= 0) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { productId, size, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, size: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.size === size))
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-slate-100">
      <TopBar
        brand={brand}
        currentPage={currentPage}
        cartCount={cartCount}
        onNavigate={handleNavigate}
      />

      <div className="flex-1">
        {currentPage === 'overview' && (
          <OverviewPage
            brand={brand}
            siteCopy={siteCopy}
            schedule={schedule}
            freeFireTeams={freeFireTeams}
            aovTeams={aovTeams}
            ffGroupStandings={ffGroupStandings}
            ffFinalStandings={ffFinalStandings}
            aovStage1Standings={aovStage1Standings}
            aovMatches={aovMatches}
            aovFinalistIds={aovFinalistIds}
          />
        )}

        {currentPage === 'tickets' && (
          <TicketsPage
            siteCopy={siteCopy}
            ticketDays={ticketDays}
            ticketTiers={ticketTiers}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'merch' && (
          <MerchPage
            siteCopy={siteCopy}
            merchProducts={merchProducts}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onClearCart={() => setCart([])}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      <SponsorFooter
        siteCopy={siteCopy}
        sponsors={sponsors}
        onNavigate={handleNavigate}
        onOpenStudio={() => setStudioOpen(true)}
      />

      <SiteStudioModal
        isOpen={studioOpen}
        brand={brand}
        siteCopy={siteCopy}
        schedule={schedule}
        freeFireTeams={freeFireTeams}
        aovTeams={aovTeams}
        ffGroupStandings={ffGroupStandings}
        ffFinalStandings={ffFinalStandings}
        aovStage1Standings={aovStage1Standings}
        aovMatches={aovMatches}
        aovFinalistIds={aovFinalistIds}
        ticketDays={ticketDays}
        ticketTiers={ticketTiers}
        merchProducts={merchProducts}
        sponsors={sponsors}
        onClose={() => setStudioOpen(false)}
        onUpdateBrand={setBrand}
        onUpdateSiteCopy={setSiteCopy}
        onUpdateSchedule={setSchedule}
        onUpdateTeam={handleUpdateTeam}
        onUpdateFfGroupStanding={handleUpdateFfGroupStanding}
        onSyncTop12ToFinals={handleSyncTop12ToFinals}
        onUpdateFfFinalStanding={handleUpdateFfFinalStanding}
        onSwapFfFinalTeam={handleSwapFfFinalTeam}
        onZeroFfFinals={handleZeroFfFinals}
        onUpdateAovStage1Standing={handleUpdateAovStage1Standing}
        onUpdateAovMatch={handleUpdateAovMatch}
        onUpdateAovFinalists={setAovFinalistIds}
        onUpdateTicketDays={setTicketDays}
        onUpdateTicketTiers={setTicketTiers}
        onUpdateMerchProducts={setMerchProducts}
        onUpdateSponsor={handleUpdateSponsor}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
