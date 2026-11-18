import React, { useState } from 'react';
import { Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react';
import {
  AovMatchEntry,
  AovStage1StandingRow,
  EventBrandConfig,
  FreeFireGroup,
  FreeFireStandingRow,
  MerchProduct,
  ScheduleItem,
  SiteCopyConfig,
  SponsorSlot,
  StudioTab,
  TeamEntry,
  TicketDayOption,
  TicketTier,
} from '../types/esports';
import { readAndResizeImageFile } from '../utils/imageUpload';

interface SiteStudioModalProps {
  isOpen: boolean;
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
  ticketDays: TicketDayOption[];
  ticketTiers: TicketTier[];
  merchProducts: MerchProduct[];
  sponsors: SponsorSlot[];
  onClose: () => void;
  onUpdateBrand: (next: EventBrandConfig) => void;
  onUpdateSiteCopy: (next: SiteCopyConfig) => void;
  onUpdateSchedule: (next: ScheduleItem[]) => void;
  onUpdateTeam: (teamId: string, patch: Partial<TeamEntry>) => void;
  onUpdateFfGroupStanding: (teamId: string, patch: Partial<FreeFireStandingRow>) => void;
  onSyncTop12ToFinals: () => void;
  onUpdateFfFinalStanding: (teamId: string, patch: Partial<FreeFireStandingRow>) => void;
  onSwapFfFinalTeam: (index: number, newTeamId: string) => void;
  onZeroFfFinals: () => void;
  onUpdateAovStage1Standing: (teamId: string, patch: Partial<AovStage1StandingRow>) => void;
  onUpdateAovMatch: (matchId: string, patch: Partial<AovMatchEntry>) => void;
  onUpdateAovFinalists: (ids: string[]) => void;
  onUpdateTicketDays: (next: TicketDayOption[]) => void;
  onUpdateTicketTiers: (next: TicketTier[]) => void;
  onUpdateMerchProducts: (next: MerchProduct[]) => void;
  onUpdateSponsor: (sponsorId: string, patch: Partial<SponsorSlot>) => void;
  onResetAll: () => void;
}

export const SiteStudioModal: React.FC<SiteStudioModalProps> = ({
  isOpen,
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
  ticketDays,
  ticketTiers,
  merchProducts,
  sponsors,
  onClose,
  onUpdateBrand,
  onUpdateSiteCopy,
  onUpdateSchedule,
  onUpdateTeam,
  onUpdateFfGroupStanding,
  onSyncTop12ToFinals,
  onUpdateFfFinalStanding,
  onSwapFfFinalTeam,
  onZeroFfFinals,
  onUpdateAovStage1Standing,
  onUpdateAovMatch,
  onUpdateAovFinalists,
  onUpdateTicketDays,
  onUpdateTicketTiers,
  onUpdateMerchProducts,
  onUpdateSponsor,
  onResetAll,
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('brand-text');
  const [teamFilter, setTeamFilter] = useState<'free-fire' | 'aov'>('free-fire');
  const [standingsSubTab, setStandingsSubTab] = useState<
    'ff-final' | 'ff-group' | 'aov-stage1' | 'aov-swiss'
  >('ff-final');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = async (
    file: File | undefined,
    mode: 'logo' | 'poster' | 'product',
    onSuccess: (url: string) => void
  ) => {
    if (!file) return;
    setUploadError(null);
    setIsProcessing(true);
    try {
      const options =
        mode === 'poster'
          ? { maxWidth: 1440, maxHeight: 810, preserveTransparency: false }
          : mode === 'product'
            ? { maxWidth: 960, maxHeight: 720, preserveTransparency: false }
            : { maxWidth: 480, maxHeight: 480, preserveTransparency: true };
      const dataUrl = await readAndResizeImageFile(file, options);
      onSuccess(dataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Không thể đọc tệp hình ảnh.');
    } finally {
      setIsProcessing(false);
    }
  };

  const sortedFfGroup = [...ffGroupStandings].sort(
    (a, b) => b.placementPts + b.killPts - (a.placementPts + a.killPts)
  );
  const sortedAovStage1 = [...aovStage1Standings].sort((a, b) =>
    b.points !== a.points ? b.points - a.points : b.gameDiff - a.gameDiff
  );
  const stage1Matches = aovMatches.filter((m) => m.stage === 'stage1');
  const swissMatches = aovMatches.filter((m) => m.stage === 'swiss');

  const toggleAovFinalist = (teamId: string) => {
    if (aovFinalistIds.includes(teamId)) {
      onUpdateAovFinalists(aovFinalistIds.filter((id) => id !== teamId));
    } else if (aovFinalistIds.length < 3) {
      onUpdateAovFinalists([...aovFinalistIds, teamId]);
    } else {
      onUpdateAovFinalists([...aovFinalistIds.slice(1), teamId]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="skymagic-studio-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-white/15 bg-[#11131A] text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 id="skymagic-studio-title" className="font-display text-2xl font-bold tracking-tight text-amber-400">
              SkyMagic Media · Trình Chỉnh Sửa Toàn Bộ Website
            </h2>
            <p className="text-xs text-slate-400">
              Thay đổi toàn bộ chữ, hình ảnh, logo, lịch đấu, đội tuyển, tỷ số, vé và merchandise theo ý muốn. Tự động lưu trên trình duyệt.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng trình chỉnh sửa SkyMagic Media"
            className="rounded-lg border border-white/10 p-2 text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-white/10 bg-[#0B0D12] px-6 py-3">
          {(
            [
              { id: 'brand-text', label: '1. Poster, Logo & Chữ Chung' },
              { id: 'schedule', label: '2. Lịch Thi Đấu' },
              { id: 'teams', label: '3. Đội Tuyển & Logo' },
              { id: 'standings', label: '4. BXH & Tỷ Số' },
              { id: 'tickets', label: '5. Trang Mua Vé' },
              { id: 'merch', label: '6. Trang Merchandise' },
              { id: 'sponsors', label: '7. 5 Nhà Tài Trợ' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-[#09090B]'
                  : 'bg-[#171A24] text-slate-300 hover:bg-[#1E2230] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {uploadError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
              {uploadError}
            </div>
          )}

          {/* TAB 1: BRAND, POSTER, 3 INTRO SIZES, FACTS & SECTION HEADINGS */}
          {activeTab === 'brand-text' && (
            <div className="space-y-6">
              {/* Top-left Event Logo & Name */}
              <div className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-400">Logo &amp; Tên Sự Kiện (Góc trên bên trái)</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Tên sự kiện"
                    value={brand.eventName}
                    onChange={(v) => onUpdateBrand({ ...brand, eventName: v })}
                  />
                  <TextField
                    label="Link URL Logo sự kiện"
                    placeholder="https://..."
                    value={brand.eventLogoUrl ?? ''}
                    onChange={(v) => onUpdateBrand({ ...brand, eventLogoUrl: v || null })}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <UploadButton
                    label={isProcessing ? 'Đang xử lý...' : 'Tải tệp Logo từ máy'}
                    onFile={(f) =>
                      handleImageUpload(f, 'logo', (url) =>
                        onUpdateBrand({ ...brand, eventLogoUrl: url })
                      )
                    }
                  />
                  {brand.eventLogoUrl && (
                    <button
                      type="button"
                      onClick={() => onUpdateBrand({ ...brand, eventLogoUrl: null })}
                      className="rounded-lg border border-white/15 px-3 py-2 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
                    >
                      Xóa logo tùy chỉnh
                    </button>
                  )}
                </div>
              </div>

              {/* Poster & 3 Font Sizes */}
              <div className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-4">
                <h3 className="text-sm font-bold text-amber-400">Ảnh Poster &amp; 3 Cỡ Chữ Giới Thiệu</h3>
                <TextField
                  label="Cỡ chữ 1 (Lớn nhất — Tiêu đề chính trên Poster)"
                  value={brand.introLarge}
                  onChange={(v) => onUpdateBrand({ ...brand, introLarge: v })}
                />
                <TextField
                  label="Cỡ chữ 2 (Trung bình — Thời gian, địa điểm & khẩu hiệu)"
                  value={brand.introMedium}
                  onChange={(v) => onUpdateBrand({ ...brand, introMedium: v })}
                />
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Cỡ chữ 3 (Nhỏ — Đoạn mô tả chi tiết giải đấu)
                  </label>
                  <textarea
                    rows={3}
                    value={brand.introSmall}
                    onChange={(e) => onUpdateBrand({ ...brand, introSmall: e.target.value })}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    label="Chữ trên nút bấm chính dưới Poster"
                    value={siteCopy.heroCtaLabel}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, heroCtaLabel: v })}
                  />
                  <TextField
                    label="Link URL ảnh Poster (16:9)"
                    value={brand.posterUrl}
                    onChange={(v) => onUpdateBrand({ ...brand, posterUrl: v })}
                  />
                </div>
                <UploadButton
                  label="Tải ảnh Poster mới từ máy"
                  onFile={(f) =>
                    handleImageUpload(f, 'poster', (url) =>
                      onUpdateBrand({ ...brand, posterUrl: url })
                    )
                  }
                />
              </div>

              {/* 4 Facts Strip */}
              <div className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3">
                <h3 className="text-sm font-bold text-amber-400">4 Ô Thông Tin Nhanh Dưới Poster</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {siteCopy.facts.map((fact, idx) => (
                    <div key={fact.id} className="rounded-lg border border-white/10 bg-[#11131A] p-3 space-y-2">
                      <TextField
                        label={`Tiêu đề ô ${idx + 1}`}
                        value={fact.label}
                        onChange={(v) =>
                          onUpdateSiteCopy({
                            ...siteCopy,
                            facts: siteCopy.facts.map((f) =>
                              f.id === fact.id ? { ...f, label: v } : f
                            ),
                          })
                        }
                      />
                      <TextField
                        label={`Nội dung ô ${idx + 1}`}
                        value={fact.value}
                        onChange={(v) =>
                          onUpdateSiteCopy({
                            ...siteCopy,
                            facts: siteCopy.facts.map((f) =>
                              f.id === fact.id ? { ...f, value: v } : f
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Titles & Footer Copy */}
              <div className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3">
                <h3 className="text-sm font-bold text-amber-400">Tiêu Đề Các Mục &amp; Bản Quyền Cuối Trang</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TextField
                    label="Nhãn nhỏ mục Lịch thi đấu"
                    value={siteCopy.scheduleKicker}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, scheduleKicker: v })}
                  />
                  <TextField
                    label="Tiêu đề mục Lịch thi đấu"
                    value={siteCopy.scheduleTitle}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, scheduleTitle: v })}
                  />
                  <TextField
                    label="Nhãn nhỏ mục Đội tuyển"
                    value={siteCopy.teamsKicker}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, teamsKicker: v })}
                  />
                  <TextField
                    label="Tiêu đề mục Đội tuyển"
                    value={siteCopy.teamsTitle}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, teamsTitle: v })}
                  />
                  <TextField
                    label="Nhãn nhỏ mục Bảng xếp hạng"
                    value={siteCopy.standingsKicker}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, standingsKicker: v })}
                  />
                  <TextField
                    label="Tiêu đề mục Bảng xếp hạng"
                    value={siteCopy.standingsTitle}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, standingsTitle: v })}
                  />
                  <TextField
                    label="Tiêu đề mục Nhà tài trợ"
                    value={siteCopy.sponsorsTitle}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, sponsorsTitle: v })}
                  />
                  <TextField
                    label="Mô tả mục Nhà tài trợ"
                    value={siteCopy.sponsorsSubtitle}
                    onChange={(v) => onUpdateSiteCopy({ ...siteCopy, sponsorsSubtitle: v })}
                  />
                </div>
                <TextField
                  label="Mô tả mục Lịch thi đấu"
                  value={siteCopy.scheduleSubtitle}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, scheduleSubtitle: v })}
                />
                <TextField
                  label="Mô tả mục Đội tuyển"
                  value={siteCopy.teamsSubtitle}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, teamsSubtitle: v })}
                />
                <TextField
                  label="Dòng chữ bản quyền ở cuối trang"
                  value={siteCopy.footerCopyright}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, footerCopyright: v })}
                />
              </div>
            </div>
          )}

          {/* TAB 2: SCHEDULE */}
          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Chỉnh sửa từng dòng lịch thi đấu hoặc thêm ngày thi đấu mới.
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSchedule([
                      ...schedule,
                      {
                        id: `sch-${Date.now()}`,
                        phaseKey: 'ff-group',
                        dayLabel: 'Ngày mới',
                        date: '21/12/2026',
                        time: '18:00 – 21:00',
                        game: 'free-fire',
                        gameLabel: 'Free Fire',
                        stage: 'Trận đấu bổ sung',
                        format: 'Bo5',
                        arena: 'Sân khấu Chính',
                        matchupSummary: 'Thông tin cặp đấu',
                      },
                    ])
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-[#09090B] cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Thêm lịch đấu</span>
                </button>
              </div>

              <div className="space-y-3">
                {schedule.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-4">
                      <TextField
                        label="Nhãn ngày"
                        value={item.dayLabel}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, dayLabel: v } : s))
                          )
                        }
                      />
                      <TextField
                        label="Ngày tháng"
                        value={item.date}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, date: v } : s))
                          )
                        }
                      />
                      <TextField
                        label="Giờ thi đấu"
                        value={item.time}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, time: v } : s))
                          )
                        }
                      />
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">
                          Bộ môn
                        </label>
                        <select
                          value={item.game}
                          onChange={(e) => {
                            const g = e.target.value as 'free-fire' | 'aov';
                            onUpdateSchedule(
                              schedule.map((s) =>
                                s.id === item.id
                                  ? {
                                      ...s,
                                      game: g,
                                      gameLabel: g === 'free-fire' ? 'Free Fire' : 'Arena of Valor',
                                    }
                                  : s
                              )
                            );
                          }}
                          className="w-full rounded-lg border border-white/15 bg-[#09090B] px-2.5 py-2 text-xs text-white"
                        >
                          <option value="free-fire">Free Fire</option>
                          <option value="aov">Arena of Valor</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <TextField
                        label="Tên vòng / Giai đoạn"
                        value={item.stage}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, stage: v } : s))
                          )
                        }
                      />
                      <TextField
                        label="Thể thức"
                        value={item.format}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, format: v } : s))
                          )
                        }
                      />
                      <TextField
                        label="Sân khấu / Địa điểm"
                        value={item.arena}
                        onChange={(v) =>
                          onUpdateSchedule(
                            schedule.map((s) => (s.id === item.id ? { ...s, arena: v } : s))
                          )
                        }
                      />
                    </div>

                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <TextField
                          label="Tóm tắt cặp đấu"
                          value={item.matchupSummary}
                          onChange={(v) =>
                            onUpdateSchedule(
                              schedule.map((s) =>
                                s.id === item.id ? { ...s, matchupSummary: v } : s
                              )
                            )
                          }
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateSchedule(schedule.filter((s) => s.id !== item.id))
                        }
                        className="rounded-lg border border-red-500/30 p-2 text-red-400 hover:bg-red-500/10 cursor-pointer"
                        title="Xóa lịch này"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAMS & LOGOS */}
          {activeTab === 'teams' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTeamFilter('free-fire')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    teamFilter === 'free-fire'
                      ? 'bg-amber-500 text-[#09090B]'
                      : 'border border-white/10 bg-[#09090B] text-slate-300'
                  }`}
                >
                  Free Fire (18 Đội · 3 Bảng)
                </button>
                <button
                  type="button"
                  onClick={() => setTeamFilter('aov')}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer ${
                    teamFilter === 'aov'
                      ? 'bg-amber-500 text-[#09090B]'
                      : 'border border-white/10 bg-[#09090B] text-slate-300'
                  }`}
                >
                  Arena of Valor (9 Đội)
                </button>
              </div>

              <div className="space-y-3">
                {(teamFilter === 'free-fire' ? freeFireTeams : aovTeams).map((team, idx) => (
                  <div
                    key={team.id}
                    className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-[#14171F] p-1">
                          {team.logoUrl ? (
                            <img
                              src={team.logoUrl}
                              alt={team.name}
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            <span className="font-mono text-[11px] font-bold text-amber-400">
                              {team.tag}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-300">
                          Đội #{idx + 1}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <UploadButton
                          label="Tải Logo đội"
                          onFile={(f) =>
                            handleImageUpload(f, 'logo', (url) =>
                              onUpdateTeam(team.id, { logoUrl: url })
                            )
                          }
                        />
                        {team.logoUrl && (
                          <button
                            type="button"
                            onClick={() => onUpdateTeam(team.id, { logoUrl: null })}
                            className="rounded-lg border border-white/15 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
                          >
                            Xóa logo
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-5">
                      <div className="sm:col-span-2">
                        <TextField
                          label="Tên đội tuyển"
                          value={team.name}
                          onChange={(v) => onUpdateTeam(team.id, { name: v })}
                        />
                      </div>
                      <TextField
                        label="Mã Tag"
                        value={team.tag}
                        onChange={(v) => onUpdateTeam(team.id, { tag: v.toUpperCase() })}
                      />
                      <TextField
                        label="Khu vực"
                        value={team.region}
                        onChange={(v) => onUpdateTeam(team.id, { region: v })}
                      />
                      <TextField
                        label="Đội trưởng"
                        value={team.captain}
                        onChange={(v) => onUpdateTeam(team.id, { captain: v })}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {teamFilter === 'free-fire' && (
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-300">
                            Bảng đấu
                          </label>
                          <select
                            value={team.group ?? 'A'}
                            onChange={(e) =>
                              onUpdateTeam(team.id, {
                                group: e.target.value as FreeFireGroup,
                              })
                            }
                            className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white"
                          >
                            <option value="A">Bảng A</option>
                            <option value="B">Bảng B</option>
                            <option value="C">Bảng C</option>
                          </select>
                        </div>
                      )}
                      <TextField
                        label="Hoặc dán URL Logo đội"
                        placeholder="https://..."
                        value={team.logoUrl ?? ''}
                        onChange={(v) => onUpdateTeam(team.id, { logoUrl: v || null })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STANDINGS & SCORES */}
          {activeTab === 'standings' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: 'ff-final', label: 'FF Chung Kết (12 Đội)' },
                    { id: 'ff-group', label: 'FF Vòng Bảng (18 Đội)' },
                    { id: 'aov-stage1', label: 'AoV GĐ1 (9 Đội Bo3)' },
                    { id: 'aov-swiss', label: 'AoV Thụy Sĩ (Bo5) & Top 3' },
                  ] as const
                ).map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setStandingsSubTab(sub.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                      standingsSubTab === sub.id
                        ? 'bg-amber-500 text-[#09090B]'
                        : 'border border-white/10 bg-[#09090B] text-slate-300'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>

              {standingsSubTab === 'ff-final' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">
                      Chỉnh điểm Chung Kết Free Fire (12 đội).
                    </span>
                    <button
                      type="button"
                      onClick={onZeroFfFinals}
                      className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-200 hover:bg-white/10 cursor-pointer"
                    >
                      Đặt tất cả về 0
                    </button>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#09090B] text-slate-400">
                          <th className="px-3 py-2">Suất</th>
                          <th className="px-3 py-2">Đội Tuyển</th>
                          <th className="px-3 py-2 w-24">Trận</th>
                          <th className="px-3 py-2 w-24">Booyah</th>
                          <th className="px-3 py-2 w-28">Điểm hạng</th>
                          <th className="px-3 py-2 w-28">Điểm Kills</th>
                          <th className="px-3 py-2 text-right">Tổng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {ffFinalStandings.map((row, idx) => (
                          <tr key={`${row.teamId}-${idx}`}>
                            <td className="px-3 py-2 font-mono text-amber-400">#{idx + 1}</td>
                            <td className="px-3 py-2">
                              <select
                                value={row.teamId}
                                onChange={(e) => onSwapFfFinalTeam(idx, e.target.value)}
                                className="w-full rounded border border-white/15 bg-[#09090B] px-2 py-1 text-xs text-white"
                              >
                                {freeFireTeams.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name} ({t.tag})
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2">
                              <NumInput
                                value={row.matches}
                                onChange={(v) => onUpdateFfFinalStanding(row.teamId, { matches: v })}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <NumInput
                                value={row.booyah}
                                onChange={(v) => onUpdateFfFinalStanding(row.teamId, { booyah: v })}
                              />
                            </td>
                            <td className="px-3 py-2">
                              <NumInput
                                value={row.placementPts}
                                onChange={(v) =>
                                  onUpdateFfFinalStanding(row.teamId, { placementPts: v })
                                }
                              />
                            </td>
                            <td className="px-3 py-2">
                              <NumInput
                                value={row.killPts}
                                onChange={(v) => onUpdateFfFinalStanding(row.teamId, { killPts: v })}
                              />
                            </td>
                            <td className="px-3 py-2 text-right font-mono font-bold text-amber-400">
                              {row.placementPts + row.killPts}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {standingsSubTab === 'ff-group' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs text-slate-400">
                      Chỉnh điểm Vòng Bảng 18 đội Free Fire.
                    </span>
                    <button
                      type="button"
                      onClick={onSyncTop12ToFinals}
                      className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 cursor-pointer"
                    >
                      Đồng bộ Top 12 vào Chung Kết
                    </button>
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full min-w-[640px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#09090B] text-slate-400">
                          <th className="px-3 py-2">#</th>
                          <th className="px-3 py-2">Đội</th>
                          <th className="px-3 py-2 w-24">Trận</th>
                          <th className="px-3 py-2 w-24">Booyah</th>
                          <th className="px-3 py-2 w-28">Điểm hạng</th>
                          <th className="px-3 py-2 w-28">Điểm Kills</th>
                          <th className="px-3 py-2 text-right">Tổng</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedFfGroup.map((row, idx) => {
                          const team = freeFireTeams.find((t) => t.id === row.teamId);
                          return (
                            <tr key={row.teamId}>
                              <td className="px-3 py-2 font-mono text-amber-400">#{idx + 1}</td>
                              <td className="px-3 py-2 text-white">
                                {team?.name ?? row.teamId} (Bảng {team?.group})
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.matches}
                                  onChange={(v) =>
                                    onUpdateFfGroupStanding(row.teamId, { matches: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.booyah}
                                  onChange={(v) =>
                                    onUpdateFfGroupStanding(row.teamId, { booyah: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.placementPts}
                                  onChange={(v) =>
                                    onUpdateFfGroupStanding(row.teamId, { placementPts: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.killPts}
                                  onChange={(v) =>
                                    onUpdateFfGroupStanding(row.teamId, { killPts: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2 text-right font-mono font-bold text-amber-400">
                                {row.placementPts + row.killPts}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {standingsSubTab === 'aov-stage1' && (
                <div className="space-y-5">
                  <div className="overflow-x-auto rounded-lg border border-white/10">
                    <table className="w-full min-w-[620px] border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#09090B] text-slate-400">
                          <th className="px-3 py-2">#</th>
                          <th className="px-3 py-2">Đội (9 Đội)</th>
                          <th className="px-3 py-2 w-20">Trận</th>
                          <th className="px-3 py-2 w-20">Thắng</th>
                          <th className="px-3 py-2 w-20">Thua</th>
                          <th className="px-3 py-2 w-24">Hiệu số</th>
                          <th className="px-3 py-2 w-24">Điểm</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {sortedAovStage1.map((row, idx) => {
                          const team = aovTeams.find((t) => t.id === row.teamId);
                          return (
                            <tr key={row.teamId}>
                              <td className="px-3 py-2 font-mono text-amber-400">#{idx + 1}</td>
                              <td className="px-3 py-2 text-white">{team?.name ?? row.teamId}</td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.played}
                                  onChange={(v) =>
                                    onUpdateAovStage1Standing(row.teamId, { played: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.wins}
                                  onChange={(v) =>
                                    onUpdateAovStage1Standing(row.teamId, { wins: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.losses}
                                  onChange={(v) =>
                                    onUpdateAovStage1Standing(row.teamId, { losses: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  allowNegative
                                  value={row.gameDiff}
                                  onChange={(v) =>
                                    onUpdateAovStage1Standing(row.teamId, { gameDiff: v })
                                  }
                                />
                              </td>
                              <td className="px-3 py-2">
                                <NumInput
                                  value={row.points}
                                  onChange={(v) =>
                                    onUpdateAovStage1Standing(row.teamId, { points: v })
                                  }
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {stage1Matches.map((m) => (
                      <MatchRowEditor
                        key={m.id}
                        match={m}
                        teams={aovTeams}
                        onUpdate={onUpdateAovMatch}
                      />
                    ))}
                  </div>
                </div>
              )}

              {standingsSubTab === 'aov-swiss' && (
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 text-xs font-semibold text-white">
                      Chọn 3 Đội Tiến Vào Chung Kết AoV
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {aovTeams.map((t) => {
                        const active = aovFinalistIds.includes(t.id);
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => toggleAovFinalist(t.id)}
                            className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                              active
                                ? 'border-amber-500 bg-amber-500 text-[#09090B]'
                                : 'border-white/15 bg-[#09090B] text-slate-300'
                            }`}
                          >
                            {t.tag} · {t.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {swissMatches.map((m) => (
                      <MatchRowEditor
                        key={m.id}
                        match={m}
                        teams={aovTeams}
                        onUpdate={onUpdateAovMatch}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: TICKETS PAGE */}
          {activeTab === 'tickets' && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Tiêu đề trang Mua Vé"
                  value={siteCopy.ticketsTitle}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, ticketsTitle: v })}
                />
                <TextField
                  label="Địa điểm & thời gian trên trang Vé"
                  value={siteCopy.ticketsVenue}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, ticketsVenue: v })}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400">Ngày Thi Đấu &amp; Hệ Số Giá</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {ticketDays.map((day) => (
                    <div key={day.id} className="rounded-lg border border-white/10 bg-[#0B0D12] p-3 space-y-2">
                      <TextField
                        label="Tên ngày"
                        value={day.label}
                        onChange={(v) =>
                          onUpdateTicketDays(
                            ticketDays.map((d) => (d.id === day.id ? { ...d, label: v } : d))
                          )
                        }
                      />
                      <TextField
                        label="Mô tả ngắn"
                        value={day.desc}
                        onChange={(v) =>
                          onUpdateTicketDays(
                            ticketDays.map((d) => (d.id === day.id ? { ...d, desc: v } : d))
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400">Các Hạng Vé</h3>
                {ticketTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3"
                  >
                    <div className="grid gap-3 sm:grid-cols-4">
                      <TextField
                        label="Tên hạng vé"
                        value={tier.name}
                        onChange={(v) =>
                          onUpdateTicketTiers(
                            ticketTiers.map((t) => (t.id === tier.id ? { ...t, name: v } : t))
                          )
                        }
                      />
                      <TextField
                        label="Khu vực ngồi"
                        value={tier.zone}
                        onChange={(v) =>
                          onUpdateTicketTiers(
                            ticketTiers.map((t) => (t.id === tier.id ? { ...t, zone: v } : t))
                          )
                        }
                      />
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">
                          Giá gốc (VNĐ)
                        </label>
                        <NumInput
                          value={tier.priceVnd}
                          onChange={(v) =>
                            onUpdateTicketTiers(
                              ticketTiers.map((t) =>
                                t.id === tier.id ? { ...t, priceVnd: v } : t
                              )
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">
                          Vé còn lại
                        </label>
                        <NumInput
                          value={tier.remaining}
                          onChange={(v) =>
                            onUpdateTicketTiers(
                              ticketTiers.map((t) =>
                                t.id === tier.id ? { ...t, remaining: v } : t
                              )
                            )
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Quyền lợi (mỗi dòng 1 quyền lợi)
                      </label>
                      <textarea
                        rows={3}
                        value={tier.perks.join('\n')}
                        onChange={(e) =>
                          onUpdateTicketTiers(
                            ticketTiers.map((t) =>
                              t.id === tier.id
                                ? { ...t, perks: e.target.value.split('\n').filter(Boolean) }
                                : t
                            )
                          )
                        }
                        className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MERCHANDISE PAGE */}
          {activeTab === 'merch' && (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField
                  label="Tiêu đề trang Merchandise"
                  value={siteCopy.merchTitle}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, merchTitle: v })}
                />
                <TextField
                  label="Mô tả dưới tiêu đề"
                  value={siteCopy.merchSubtitle}
                  onChange={(v) => onUpdateSiteCopy({ ...siteCopy, merchSubtitle: v })}
                />
              </div>

              <div className="space-y-4">
                {merchProducts.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="h-12 w-16 rounded border border-white/10 object-cover"
                        />
                        <span className="text-xs font-bold text-white">{product.name}</span>
                      </div>
                      <UploadButton
                        label="Đổi ảnh sản phẩm"
                        onFile={(f) =>
                          handleImageUpload(f, 'product', (url) =>
                            onUpdateMerchProducts(
                              merchProducts.map((p) =>
                                p.id === product.id ? { ...p, imageUrl: url } : p
                              )
                            )
                          )
                        }
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4">
                      <TextField
                        label="Tên sản phẩm"
                        value={product.name}
                        onChange={(v) =>
                          onUpdateMerchProducts(
                            merchProducts.map((p) =>
                              p.id === product.id ? { ...p, name: v } : p
                            )
                          )
                        }
                      />
                      <TextField
                        label="Danh mục"
                        value={product.category}
                        onChange={(v) =>
                          onUpdateMerchProducts(
                            merchProducts.map((p) =>
                              p.id === product.id ? { ...p, category: v } : p
                            )
                          )
                        }
                      />
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">
                          Giá bán (VNĐ)
                        </label>
                        <NumInput
                          value={product.priceVnd}
                          onChange={(v) =>
                            onUpdateMerchProducts(
                              merchProducts.map((p) =>
                                p.id === product.id ? { ...p, priceVnd: v } : p
                              )
                            )
                          }
                        />
                      </div>
                      <TextField
                        label="Trạng thái"
                        value={product.availabilityNote}
                        onChange={(v) =>
                          onUpdateMerchProducts(
                            merchProducts.map((p) =>
                              p.id === product.id ? { ...p, availabilityNote: v } : p
                            )
                          )
                        }
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <TextField
                        label="Link URL ảnh sản phẩm"
                        value={product.imageUrl}
                        onChange={(v) =>
                          onUpdateMerchProducts(
                            merchProducts.map((p) =>
                              p.id === product.id ? { ...p, imageUrl: v } : p
                            )
                          )
                        }
                      />
                      <TextField
                        label="Kích cỡ (ngăn cách bằng dấu phẩy)"
                        value={product.sizes.join(', ')}
                        onChange={(v) =>
                          onUpdateMerchProducts(
                            merchProducts.map((p) =>
                              p.id === product.id
                                ? {
                                    ...p,
                                    sizes: v
                                      .split(',')
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  }
                                : p
                            )
                          )
                        }
                      />
                    </div>

                    <TextField
                      label="Mô tả sản phẩm"
                      value={product.description}
                      onChange={(v) =>
                        onUpdateMerchProducts(
                          merchProducts.map((p) =>
                            p.id === product.id ? { ...p, description: v } : p
                          )
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: 5 SPONSORS */}
          {activeTab === 'sponsors' && (
            <div className="space-y-4">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.id}
                  className="rounded-xl border border-white/10 bg-[#0B0D12] p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-24 items-center justify-center overflow-hidden rounded border border-white/10 bg-[#14171F] p-1.5">
                        {sponsor.logoUrl ? (
                          <img
                            src={sponsor.logoUrl}
                            alt={sponsor.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="font-mono text-[10px] text-slate-500">
                            SLOT 0{sponsor.slotIndex}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        Nhà Tài Trợ Slot 0{sponsor.slotIndex}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <UploadButton
                        label="Tải Logo Nhà Tài Trợ"
                        onFile={(f) =>
                          handleImageUpload(f, 'logo', (url) =>
                            onUpdateSponsor(sponsor.id, { logoUrl: url })
                          )
                        }
                      />
                      {sponsor.logoUrl && (
                        <button
                          type="button"
                          onClick={() => onUpdateSponsor(sponsor.id, { logoUrl: null })}
                          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 cursor-pointer"
                        >
                          Xóa logo
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <TextField
                      label="Tên Nhà Tài Trợ"
                      value={sponsor.name}
                      onChange={(v) => onUpdateSponsor(sponsor.id, { name: v })}
                    />
                    <TextField
                      label="Hạng / Vai trò"
                      value={sponsor.tierLabel}
                      onChange={(v) => onUpdateSponsor(sponsor.id, { tierLabel: v })}
                    />
                    <TextField
                      label="Hoặc dán URL Logo"
                      placeholder="https://..."
                      value={sponsor.logoUrl ?? ''}
                      onChange={(v) => onUpdateSponsor(sponsor.id, { logoUrl: v || null })}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0B0D12] px-6 py-4">
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Khôi phục mặc định toàn trang</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-amber-500 px-5 py-2 text-xs font-semibold text-[#09090B] hover:bg-amber-400 cursor-pointer"
          >
            Lưu &amp; Xem Website
          </button>
        </div>
      </div>
    </div>
  );
};

const TextField: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}> = ({ label, value, placeholder, onChange }) => (
  <div>
    <label className="mb-1 block text-xs font-medium text-slate-300">{label}</label>
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
    />
  </div>
);

const NumInput: React.FC<{
  value: number;
  allowNegative?: boolean;
  onChange: (value: number) => void;
}> = ({ value, allowNegative = false, onChange }) => (
  <input
    type="number"
    min={allowNegative ? -99 : 0}
    value={value}
    onChange={(e) => {
      const parsed = parseInt(e.target.value, 10);
      onChange(Number.isNaN(parsed) ? 0 : parsed);
    }}
    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-2.5 py-1.5 font-mono text-xs text-white tabular-nums focus:border-amber-400 focus:outline-none"
  />
);

const UploadButton: React.FC<{
  label: string;
  onFile: (file: File | undefined) => void;
}> = ({ label, onFile }) => (
  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 transition-colors hover:bg-amber-500/20">
    <Upload className="h-3.5 w-3.5" />
    <span>{label}</span>
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => onFile(e.target.files?.[0])}
    />
  </label>
);

const MatchRowEditor: React.FC<{
  match: AovMatchEntry;
  teams: TeamEntry[];
  onUpdate: (matchId: string, patch: Partial<AovMatchEntry>) => void;
}> = ({ match, teams, onUpdate }) => (
  <div className="rounded-lg border border-white/10 bg-[#0B0D12] p-3 space-y-2">
    <div className="flex items-center justify-between text-[11px] text-slate-400">
      <span className="font-semibold text-amber-400">{match.roundLabel}</span>
      <span className="font-mono">{match.bestOf}</span>
    </div>
    <div className="flex items-center gap-2">
      <select
        value={match.teamAId ?? ''}
        onChange={(e) => onUpdate(match.id, { teamAId: e.target.value || null })}
        className="min-w-0 flex-1 rounded border border-white/15 bg-[#14171F] px-2 py-1.5 text-xs text-white"
      >
        <option value="">-- Đội A --</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.tag} · {t.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        max={4}
        value={match.scoreA ?? ''}
        onChange={(e) =>
          onUpdate(match.id, {
            scoreA: e.target.value === '' ? null : Math.max(0, parseInt(e.target.value, 10) || 0),
          })
        }
        className="w-14 rounded border border-white/15 bg-[#14171F] px-2 py-1.5 text-center font-mono text-xs font-bold text-amber-400"
      />
    </div>
    <div className="flex items-center gap-2">
      <select
        value={match.teamBId ?? ''}
        onChange={(e) => onUpdate(match.id, { teamBId: e.target.value || null })}
        className="min-w-0 flex-1 rounded border border-white/15 bg-[#14171F] px-2 py-1.5 text-xs text-white"
      >
        <option value="">-- Đội B --</option>
        {teams.map((t) => (
          <option key={t.id} value={t.id}>
            {t.tag} · {t.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={0}
        max={4}
        value={match.scoreB ?? ''}
        onChange={(e) =>
          onUpdate(match.id, {
            scoreB: e.target.value === '' ? null : Math.max(0, parseInt(e.target.value, 10) || 0),
          })
        }
        className="w-14 rounded border border-white/15 bg-[#14171F] px-2 py-1.5 text-center font-mono text-xs font-bold text-amber-400"
      />
    </div>
  </div>
);
