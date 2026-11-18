import React, { useMemo, useState } from 'react';
import { ArrowDown, Calendar, Trophy, Users } from 'lucide-react';
import {
  AovMatchEntry,
  AovStage1StandingRow,
  EventBrandConfig,
  FreeFireGroup,
  FreeFireStandingRow,
  ScheduleItem,
  SiteCopyConfig,
  TeamEntry,
} from '../types/esports';
import { TeamEmblem } from './EmblemMark';

interface OverviewPageProps {
  brand: EventBrandConfig;
  siteCopy: SiteCopyConfig;
  schedule: ScheduleItem[];
  freeFireTeams: TeamEntry[];
  aovTeams: TeamEntry[];
  ffGroupStandings: FreeFireStandingRow[];
  ffFinalStandings: FreeFireStandingRow[];
  aovStage1Standings: AovStage1StandingRow[];
  aovMatches: AovMatchEntry[];
  aovFinalistIds: string[];
}

export const OverviewPage: React.FC<OverviewPageProps> = ({
  brand,
  siteCopy,
  schedule,
  freeFireTeams,
  aovTeams,
  ffGroupStandings,
  ffFinalStandings,
  aovStage1Standings,
  aovMatches,
  aovFinalistIds,
}) => {
  const [scheduleGameFilter, setScheduleGameFilter] = useState<'all' | 'free-fire' | 'aov'>('all');
  const [schedulePhaseFilter, setSchedulePhaseFilter] = useState<
    'all' | 'ff-group' | 'aov-stage1' | 'aov-swiss' | 'ff-final'
  >('all');
  const [teamTab, setTeamTab] = useState<'free-fire' | 'aov'>('free-fire');
  const [ffGroupFilter, setFfGroupFilter] = useState<'ALL' | FreeFireGroup>('ALL');
  const [standingsTab, setStandingsTab] = useState<'both' | 'free-fire' | 'aov'>('both');
  const [ffTableView, setFfTableView] = useState<'both' | 'final' | 'group'>('both');
  const [posterError, setPosterError] = useState(false);

  const allTeamsMap = useMemo(() => {
    const map = new Map<string, TeamEntry>();
    for (const t of freeFireTeams) map.set(t.id, t);
    for (const t of aovTeams) map.set(t.id, t);
    return map;
  }, [freeFireTeams, aovTeams]);

  const filteredSchedule = useMemo(() => {
    return schedule.filter((item) => {
      const matchGame = scheduleGameFilter === 'all' || item.game === scheduleGameFilter;
      const matchPhase = schedulePhaseFilter === 'all' || item.phaseKey === schedulePhaseFilter;
      return matchGame && matchPhase;
    });
  }, [schedule, scheduleGameFilter, schedulePhaseFilter]);

  const displayedFfTeams = useMemo(() => {
    if (ffGroupFilter === 'ALL') return freeFireTeams;
    return freeFireTeams.filter((t) => t.group === ffGroupFilter);
  }, [freeFireTeams, ffGroupFilter]);

  const sortedFfGroupStandings = useMemo(() => {
    return [...ffGroupStandings].sort(
      (a, b) => b.placementPts + b.killPts - (a.placementPts + a.killPts)
    );
  }, [ffGroupStandings]);

  const sortedFfFinalStandings = useMemo(() => {
    return [...ffFinalStandings].sort((a, b) => {
      const diff = b.placementPts + b.killPts - (a.placementPts + a.killPts);
      if (diff !== 0) return diff;
      return b.booyah - a.booyah;
    });
  }, [ffFinalStandings]);

  const allFfFinalsZero = useMemo(
    () =>
      ffFinalStandings.every(
        (r) => r.matches === 0 && r.booyah === 0 && r.placementPts === 0 && r.killPts === 0
      ),
    [ffFinalStandings]
  );

  const sortedAovStage1 = useMemo(() => {
    return [...aovStage1Standings].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.gameDiff - a.gameDiff;
    });
  }, [aovStage1Standings]);

  const aovStage1Matches = useMemo(
    () => aovMatches.filter((m) => m.stage === 'stage1'),
    [aovMatches]
  );
  const aovSwissMatches = useMemo(
    () => aovMatches.filter((m) => m.stage === 'swiss'),
    [aovMatches]
  );

  return (
    <main>
      {/* HERO POSTER + 3 TIERS OF INTRO TYPOGRAPHY */}
      <section id="gioi-thieu" className="relative overflow-hidden border-b border-white/10">
        <div className="relative min-h-[540px] lg:min-h-[640px] w-full flex items-end">
          {!posterError ? (
            <img
              src={brand.posterUrl}
              alt={brand.introLarge}
              referrerPolicy="no-referrer"
              onError={() => setPosterError(true)}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#161923] via-[#0E1016] to-[#09090B]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B]/85 via-[#09090B]/40 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="max-w-3xl space-y-4">
              {/* Cỡ chữ 1 (Lớn nhất) */}
              <h1
                className="font-display font-bold tracking-tight text-white leading-[1.02] text-balance"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
              >
                {brand.introLarge}
              </h1>

              {/* Cỡ chữ 2 (Trung bình) */}
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-amber-400 leading-snug">
                {brand.introMedium}
              </p>

              {/* Cỡ chữ 3 (Nhỏ) */}
              <p className="max-w-2xl text-sm sm:text-base text-slate-200 leading-relaxed">
                {brand.introSmall}
              </p>

              <div className="pt-3">
                <a
                  href="#lich-thi-dau"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-[#09090B] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0"
                >
                  <span>{siteCopy.heroCtaLabel}</span>
                  <ArrowDown className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column Event Facts Strip */}
        <div className="border-t border-white/10 bg-[#0D0F15]">
          <div className="mx-auto grid max-w-[1360px] grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
            {siteCopy.facts.map((fact, idx) => (
              <div key={fact.id} className="px-6 py-5">
                <div className="text-xs font-medium text-slate-400">{fact.label}</div>
                <div
                  className={`mt-1 font-display text-2xl font-bold ${
                    idx === 0 ? 'text-amber-400 tabular-nums' : 'text-white'
                  }`}
                >
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1: LỊCH THI ĐẤU */}
      <section
        id="lich-thi-dau"
        className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Calendar className="h-4 w-4" />
              <span>{siteCopy.scheduleKicker}</span>
            </div>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {siteCopy.scheduleTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              {siteCopy.scheduleSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#12151D] p-1">
              {(
                [
                  { id: 'all', label: 'Tất cả' },
                  { id: 'free-fire', label: 'Free Fire' },
                  { id: 'aov', label: 'Arena of Valor' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setScheduleGameFilter(tab.id);
                    setSchedulePhaseFilter('all');
                  }}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    scheduleGameFilter === tab.id
                      ? 'bg-amber-500 text-[#09090B]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-[#12151D] p-1">
              {(
                [
                  { id: 'all', label: 'Mọi giai đoạn' },
                  { id: 'ff-group', label: 'FF Vòng Bảng (12 ngày)' },
                  { id: 'aov-stage1', label: 'AoV GĐ1 (Bo3)' },
                  { id: 'aov-swiss', label: 'AoV Thụy Sĩ (Bo5)' },
                  { id: 'ff-final', label: 'Chung Kết' },
                ] as const
              ).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSchedulePhaseFilter(p.id)}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    schedulePhaseFilter === p.id
                      ? 'bg-white/15 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 max-h-[540px] overflow-y-auto divide-y divide-white/10 rounded-xl border border-white/10 bg-[#11131A]">
          {filteredSchedule.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              Không có trận đấu nào phù hợp với bộ lọc đã chọn.
            </div>
          ) : (
            filteredSchedule.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02] md:grid-cols-12 md:items-center"
              >
                <div className="md:col-span-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-200">{item.dayLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.date}</span>
                  </div>
                  <div className="mt-1 font-mono text-sm font-semibold text-amber-400 tabular-nums">
                    {item.time}
                  </div>
                </div>

                <div className="md:col-span-5">
                  <div className="text-xs font-semibold text-slate-400">
                    {item.gameLabel}
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{item.format}</span>
                  </div>
                  <div className="mt-0.5 text-sm sm:text-base font-semibold text-white">
                    {item.stage}
                  </div>
                </div>

                <div className="md:col-span-4 md:text-right">
                  <div className="text-sm font-medium text-slate-200">{item.matchupSummary}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{item.arena}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* SECTION 2: DANH SÁCH CÁC ĐỘI TUYỂN THAM DỰ */}
      <section
        id="doi-tuyen"
        className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6 lg:px-8 border-b border-white/10"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Users className="h-4 w-4" />
              <span>{siteCopy.teamsKicker}</span>
            </div>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {siteCopy.teamsTitle}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              {siteCopy.teamsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#12151D] p-1 self-start">
            <button
              type="button"
              onClick={() => setTeamTab('free-fire')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                teamTab === 'free-fire'
                  ? 'bg-amber-500 text-[#09090B]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Free Fire ({freeFireTeams.length} Đội · 3 Bảng)
            </button>
            <button
              type="button"
              onClick={() => setTeamTab('aov')}
              className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                teamTab === 'aov'
                  ? 'bg-amber-500 text-[#09090B]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Arena of Valor ({aovTeams.length} Đội)
            </button>
          </div>
        </div>

        {teamTab === 'free-fire' && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {(
              [
                { id: 'ALL', label: 'Tất cả 3 bảng (18 đội)' },
                { id: 'A', label: 'Bảng A (6 đội)' },
                { id: 'B', label: 'Bảng B (6 đội)' },
                { id: 'C', label: 'Bảng C (6 đội)' },
              ] as const
            ).map((grp) => (
              <button
                key={grp.id}
                type="button"
                onClick={() => setFfGroupFilter(grp.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  ffGroupFilter === grp.id
                    ? 'border-amber-500 bg-amber-500/15 text-amber-300'
                    : 'border-white/10 bg-[#11131A] text-slate-400 hover:text-white'
                }`}
              >
                {grp.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(teamTab === 'free-fire' ? displayedFfTeams : aovTeams).map((team) => (
            <div
              key={team.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-[#11131A] p-4"
            >
              <TeamEmblem
                logoUrl={team.logoUrl}
                tag={team.tag}
                name={team.name}
                accentHex={team.accentHex}
                size="md"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>
                    {team.game === 'free-fire' ? `Bảng ${team.group}` : `Hạt giống #${team.seed}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-300">{team.tag}</span>
                </div>
                <div className="mt-0.5 truncate text-sm font-semibold text-white">
                  {team.name}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <span>{team.region}</span>
                  <span aria-hidden="true">·</span>
                  <span>Đội trưởng: {team.captain}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: BẢNG XẾP HẠNG & THỂ THỨC 2 TỰA GAME */}
      <section
        id="bang-xep-hang"
        className="mx-auto max-w-[1360px] px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Trophy className="h-4 w-4" />
              <span>{siteCopy.standingsKicker}</span>
            </div>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {siteCopy.standingsTitle}
            </h2>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#12151D] p-1 self-start">
            {(
              [
                { id: 'both', label: 'Cả 2 tựa game' },
                { id: 'free-fire', label: 'Free Fire' },
                { id: 'aov', label: 'Arena of Valor' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStandingsTab(tab.id)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  standingsTab === tab.id
                    ? 'bg-amber-500 text-[#09090B]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-16">
          {/* 1. FREE FIRE */}
          {(standingsTab === 'both' || standingsTab === 'free-fire') && (
            <div className="space-y-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    1. Free Fire — 18 Đội (3 Bảng) &amp; Chung Kết 12 Đội
                  </h3>
                  <p className="text-xs text-slate-400">
                    Vòng Bảng xoay vòng 1 ngày 2 bảng (mỗi cặp bảng gặp nhau 4 lần) · Chọn 12 đội vào Chung Kết.
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-[#12151D] p-1 self-start">
                  {(
                    [
                      { id: 'both', label: 'Cả 2 bảng' },
                      { id: 'final', label: 'Chung Kết (12 Đội)' },
                      { id: 'group', label: 'Vòng Bảng (18 Đội)' },
                    ] as const
                  ).map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setFfTableView(v.id)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        ffTableView === v.id
                          ? 'bg-white/15 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {(ffTableView === 'both' || ffTableView === 'final') && (
                <div>
                  <div className="mb-3 text-sm font-semibold text-white">
                    Bảng Điểm Chung Kết (12 Đội)
                    <span className="ml-2 text-xs font-normal text-amber-400">
                      · {allFfFinalsZero ? 'Chưa công bố (Mặc định về 0)' : 'Đã cập nhật điểm'}
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#11131A]">
                    <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#0C0E14] text-xs font-semibold text-slate-400">
                          <th className="px-4 py-3.5 w-16 text-center">Hạng</th>
                          <th className="px-4 py-3.5">Đội Tuyển (12 Đội Chung Kết)</th>
                          <th className="px-4 py-3.5 text-right">Số Trận</th>
                          <th className="px-4 py-3.5 text-right">Booyah!</th>
                          <th className="px-4 py-3.5 text-right">Điểm Hạng</th>
                          <th className="px-4 py-3.5 text-right">Điểm Kills</th>
                          <th className="px-4 py-3.5 text-right text-amber-400">Tổng Điểm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedFfFinalStandings.map((row, index) => {
                          const team = allTeamsMap.get(row.teamId);
                          const total = row.placementPts + row.killPts;
                          return (
                            <tr
                              key={row.teamId}
                              className="transition-colors hover:bg-white/[0.03]"
                            >
                              <td className="px-4 py-3 text-center font-mono font-semibold text-slate-400 tabular-nums">
                                {allFfFinalsZero
                                  ? '—'
                                  : index + 1 < 10
                                    ? `0${index + 1}`
                                    : index + 1}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-3">
                                  {team && (
                                    <TeamEmblem
                                      logoUrl={team.logoUrl}
                                      tag={team.tag}
                                      name={team.name}
                                      accentHex={team.accentHex}
                                      size="sm"
                                    />
                                  )}
                                  <div>
                                    <div className="font-semibold text-white">
                                      {team?.name ?? row.teamId}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                      {team?.tag} · Bảng {team?.group}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-slate-300 tabular-nums">
                                {row.matches}
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-slate-300 tabular-nums">
                                {row.booyah}
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-slate-300 tabular-nums">
                                {row.placementPts}
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-slate-300 tabular-nums">
                                {row.killPts}
                              </td>
                              <td className="px-4 py-3 text-right font-mono text-base font-bold text-amber-400 tabular-nums">
                                {total}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {(ffTableView === 'both' || ffTableView === 'group') && (
                <div>
                  <div className="mb-3 text-sm font-semibold text-white">
                    Bảng Xếp Hạng Tổng Vòng Bảng (18 Đội)
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      · Top 12 vào Chung Kết · Top 13–18 dừng bước
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#11131A]">
                    <table className="w-full min-w-[700px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#0C0E14] text-xs font-semibold text-slate-400">
                          <th className="px-4 py-3 w-16 text-center">Hạng</th>
                          <th className="px-4 py-3">Đội Tuyển</th>
                          <th className="px-4 py-3 text-center">Bảng</th>
                          <th className="px-4 py-3 text-right">Trận</th>
                          <th className="px-4 py-3 text-right">Booyah!</th>
                          <th className="px-4 py-3 text-right">Điểm Hạng</th>
                          <th className="px-4 py-3 text-right">Điểm Kills</th>
                          <th className="px-4 py-3 text-right text-amber-400">Tổng Điểm</th>
                          <th className="px-4 py-3 text-right">Kết Quả</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedFfGroupStandings.map((row, idx) => {
                          const team = allTeamsMap.get(row.teamId);
                          const total = row.placementPts + row.killPts;
                          const qualified = idx < 12;
                          return (
                            <tr
                              key={row.teamId}
                              className={`transition-colors hover:bg-white/[0.03] ${
                                !qualified ? 'opacity-70' : ''
                              }`}
                            >
                              <td className="px-4 py-2.5 text-center font-mono font-semibold tabular-nums">
                                <span className={qualified ? 'text-amber-400' : 'text-slate-500'}>
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                              </td>
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-3">
                                  {team && (
                                    <TeamEmblem
                                      logoUrl={team.logoUrl}
                                      tag={team.tag}
                                      name={team.name}
                                      accentHex={team.accentHex}
                                      size="sm"
                                    />
                                  )}
                                  <span className="font-semibold text-white">
                                    {team?.name ?? row.teamId}
                                  </span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5 text-center font-mono text-xs text-slate-300">
                                {team?.group ?? '—'}
                              </td>
                              <td className="px-4 py-2.5 text-right font-mono text-slate-300 tabular-nums">
                                {row.matches}
                              </td>
                              <td className="px-4 py-2.5 text-right font-mono text-slate-300 tabular-nums">
                                {row.booyah}
                              </td>
                              <td className="px-4 py-2.5 text-right font-mono text-slate-300 tabular-nums">
                                {row.placementPts}
                              </td>
                              <td className="px-4 py-2.5 text-right font-mono text-slate-300 tabular-nums">
                                {row.killPts}
                              </td>
                              <td className="px-4 py-2.5 text-right font-mono font-bold text-amber-400 tabular-nums">
                                {total}
                              </td>
                              <td className="px-4 py-2.5 text-right text-xs font-medium">
                                <span className={qualified ? 'text-emerald-400' : 'text-slate-500'}>
                                  {qualified ? 'Vào Chung Kết' : 'Dừng bước'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. ARENA OF VALOR */}
          {(standingsTab === 'both' || standingsTab === 'aov') && (
            <div className="space-y-10">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  2. Arena of Valor — 9 Đội Thi Đấu 2 Giai Đoạn
                </h3>
                <p className="text-xs text-slate-400">
                  Giai đoạn 1: Đấu xoay vòng (Bo3) loại 3 đội · Giai đoạn 2: Vòng Thụy Sĩ (Bo5) chọn 3 đội vào Chung Kết.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Giai Đoạn 1 · Bảng Xếp Hạng Tổng (9 Đội · Xoay Vòng Bo3)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Hạng 1–6 đi tiếp vào Vòng Thụy Sĩ (Bo5) · Hạng 7–9 bị loại
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#11131A]">
                  <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#0C0E14] text-xs font-semibold text-slate-400">
                        <th className="px-4 py-3.5 w-16 text-center">Hạng</th>
                        <th className="px-4 py-3.5">Đội Tuyển (9 Đội)</th>
                        <th className="px-4 py-3.5 text-right">Số Trận</th>
                        <th className="px-4 py-3.5 text-right">Thắng (Bo3)</th>
                        <th className="px-4 py-3.5 text-right">Thua (Bo3)</th>
                        <th className="px-4 py-3.5 text-right">Hiệu Số Ván</th>
                        <th className="px-4 py-3.5 text-right text-amber-400">Điểm</th>
                        <th className="px-4 py-3.5 text-right">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {sortedAovStage1.map((row, idx) => {
                        const team = allTeamsMap.get(row.teamId);
                        const advances = idx < 6;
                        return (
                          <tr
                            key={row.teamId}
                            className={`transition-colors hover:bg-white/[0.03] ${
                              !advances ? 'bg-red-500/[0.03] opacity-75' : ''
                            }`}
                          >
                            <td className="px-4 py-3 text-center font-mono font-semibold tabular-nums">
                              <span className={advances ? 'text-amber-400' : 'text-red-400'}>
                                0{idx + 1}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {team && (
                                  <TeamEmblem
                                    logoUrl={team.logoUrl}
                                    tag={team.tag}
                                    name={team.name}
                                    accentHex={team.accentHex}
                                    size="sm"
                                  />
                                )}
                                <div>
                                  <div className="font-semibold text-white">
                                    {team?.name ?? row.teamId}
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {team?.tag} · {team?.region}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-300 tabular-nums">
                              {row.played}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-emerald-400 tabular-nums">
                              {row.wins}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-400 tabular-nums">
                              {row.losses}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-slate-200 tabular-nums">
                              {row.gameDiff > 0 ? `+${row.gameDiff}` : row.gameDiff}
                            </td>
                            <td className="px-4 py-3 text-right font-mono text-base font-bold text-amber-400 tabular-nums">
                              {row.points}
                            </td>
                            <td className="px-4 py-3 text-right text-xs font-medium">
                              <span className={advances ? 'text-emerald-400' : 'text-red-400'}>
                                {advances ? 'Vào Vòng Thụy Sĩ' : 'Bị loại (3 đội cuối)'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {aovStage1Matches.map((m) => (
                    <AovMatchCard key={m.id} match={m} teamsMap={allTeamsMap} />
                  ))}
                </div>
              </div>

              <div className="space-y-5 rounded-xl border border-white/10 bg-[#11131A] p-5 sm:p-6">
                <div>
                  <h4 className="text-base font-bold text-white">
                    Giai Đoạn 2 · Vòng Thụy Sĩ (6 Đội · Bo5) — Tìm 3 Đội Tới Chung Kết
                  </h4>
                  <p className="text-xs text-slate-400">
                    6 đội vượt qua Giai đoạn 1 thi đấu hệ Thụy Sĩ (Bo5), 3 đội đạt 2 chiến thắng tiến vào Chung Kết.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[0, 1, 2].map((slotIdx) => {
                    const teamId = aovFinalistIds[slotIdx];
                    const team = teamId ? allTeamsMap.get(teamId) : undefined;
                    return (
                      <div
                        key={slotIdx}
                        className="flex items-center gap-3 rounded-lg border border-amber-500/40 bg-amber-500/[0.07] p-3.5"
                      >
                        <div className="font-mono text-xs font-bold text-amber-400 tabular-nums">
                          CK #{slotIdx + 1}
                        </div>
                        {team ? (
                          <>
                            <TeamEmblem
                              logoUrl={team.logoUrl}
                              tag={team.tag}
                              name={team.name}
                              accentHex={team.accentHex}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <div className="truncate text-sm font-bold text-white">
                                {team.name}
                              </div>
                              <div className="text-[11px] text-amber-300">
                                Vé vào Chung Kết AoV
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="text-xs text-slate-400">Chưa xác định đội</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {aovSwissMatches.map((m) => (
                    <AovMatchCard key={m.id} match={m} teamsMap={allTeamsMap} highlight />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

const AovMatchCard: React.FC<{
  match: AovMatchEntry;
  teamsMap: Map<string, TeamEntry>;
  highlight?: boolean;
}> = ({ match, teamsMap, highlight = false }) => {
  const teamA = match.teamAId ? teamsMap.get(match.teamAId) : undefined;
  const teamB = match.teamBId ? teamsMap.get(match.teamBId) : undefined;

  const hasScores = match.scoreA !== null && match.scoreB !== null;
  const winnerA = hasScores && (match.scoreA ?? 0) > (match.scoreB ?? 0);
  const winnerB = hasScores && (match.scoreB ?? 0) > (match.scoreA ?? 0);

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-[#0B0D12] ${
        highlight ? 'border-amber-500/30' : 'border-white/10'
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-1.5 text-[11px] text-slate-400">
        <span className="font-semibold text-amber-400 truncate">
          {match.roundLabel} · {match.bestOf}
        </span>
        <span className="font-mono shrink-0 ml-2 tabular-nums">{match.scheduleTime}</span>
      </div>

      <div className="divide-y divide-white/10">
        <div
          className={`flex items-center justify-between gap-2 px-3 py-2 ${
            winnerA ? 'bg-amber-500/[0.06]' : ''
          }`}
        >
          <div className="flex min-w-0 items-center gap-2">
            {teamA && (
              <TeamEmblem
                logoUrl={teamA.logoUrl}
                tag={teamA.tag}
                name={teamA.name}
                accentHex={teamA.accentHex}
                size="sm"
              />
            )}
            <span
              className={`truncate text-xs ${
                winnerA
                  ? 'font-semibold text-white'
                  : winnerB
                    ? 'text-slate-400'
                    : 'text-slate-200'
              }`}
            >
              {teamA?.name ?? match.teamAPlaceholder ?? 'Chờ xác định'}
            </span>
          </div>
          <span
            className={`font-mono text-sm font-bold tabular-nums ${
              winnerA ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            {match.scoreA !== null ? match.scoreA : '—'}
          </span>
        </div>

        <div
          className={`flex items-center justify-between gap-2 px-3 py-2 ${
            winnerB ? 'bg-amber-500/[0.06]' : ''
          }`}
        >
          <div className="flex min-w-0 items-center gap-2">
            {teamB && (
              <TeamEmblem
                logoUrl={teamB.logoUrl}
                tag={teamB.tag}
                name={teamB.name}
                accentHex={teamB.accentHex}
                size="sm"
              />
            )}
            <span
              className={`truncate text-xs ${
                winnerB
                  ? 'font-semibold text-white'
                  : winnerA
                    ? 'text-slate-400'
                    : 'text-slate-200'
              }`}
            >
              {teamB?.name ?? match.teamBPlaceholder ?? 'Chờ xác định'}
            </span>
          </div>
          <span
            className={`font-mono text-sm font-bold tabular-nums ${
              winnerB ? 'text-amber-400' : 'text-slate-400'
            }`}
          >
            {match.scoreB !== null ? match.scoreB : '—'}
          </span>
        </div>
      </div>
    </div>
  );
};
