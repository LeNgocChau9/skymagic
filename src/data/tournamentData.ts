import {
  AovMatchEntry,
  AovStage1StandingRow,
  EventBrandConfig,
  FreeFireStandingRow,
  MerchProduct,
  ScheduleItem,
  SiteCopyConfig,
  SponsorSlot,
  TeamEntry,
  TicketDayOption,
  TicketTier,
} from '../types/esports';

export const DEFAULT_POSTER_URL = '/src/assets/images/hero_esports_poster_1794922955837.jpg';

export const DEFAULT_BRAND_CONFIG: EventBrandConfig = {
  eventName: 'Vanguard Championship 2026',
  eventLogoUrl: null,
  posterUrl: DEFAULT_POSTER_URL,
  introLarge: 'VANGUARD ESPORTS CHAMPIONSHIP 2026',
  introMedium: 'Giải Đấu Toàn Quốc · Nhà Thi Đấu Phú Thọ, TP.HCM · Mùa Giải 2026',
  introSmall:
    'Quy tụ 18 đội tuyển Free Fire chia 3 bảng đấu xoay vòng chọn 12 cái tên vào Chung Kết cùng 9 đội tuyển Arena of Valor tranh tài qua 2 giai đoạn (Vòng tròn Bo3 & Vòng Thụy Sĩ Bo5) tìm ra 3 đại diện xuất sắc nhất.',
};

export const DEFAULT_SITE_COPY: SiteCopyConfig = {
  heroCtaLabel: 'Xem Lịch & Bảng Xếp Hạng',
  facts: [
    { id: 'fact-1', label: 'Tổng giải thưởng', value: '2.500.000.000 VNĐ' },
    { id: 'fact-2', label: 'Bộ môn Free Fire', value: '18 Đội (3 Bảng) · Top 12 Chung Kết' },
    { id: 'fact-3', label: 'Bộ môn Arena of Valor', value: '9 Đội · GĐ1 Bo3 + Thụy Sĩ Bo5' },
    { id: 'fact-4', label: 'Địa điểm Chung Kết', value: 'NTĐ Phú Thọ · TP. Hồ Chí Minh' },
  ],
  scheduleKicker: '01. Chương trình thi đấu chính thức',
  scheduleTitle: 'Lịch Thi Đấu Giải Đấu',
  scheduleSubtitle:
    'Free Fire xoay vòng 1 ngày 2 bảng đấu (mỗi cặp bảng gặp nhau 4 lần qua 12 ngày) · AoV chia 2 giai đoạn (Bo3 & Vòng Thụy Sĩ Bo5).',
  teamsKicker: '02. Các đội tuyển góp mặt',
  teamsTitle: 'Danh Sách Đội Tuyển Tham Dự',
  teamsSubtitle:
    'Danh sách chính thức 18 đội tuyển Free Fire (3 bảng A/B/C) và 9 đội tuyển Arena of Valor mùa giải 2026.',
  standingsKicker: '03. Cập nhật kết quả chuyên môn',
  standingsTitle: 'Bảng Xếp Hạng & Thể Thức Thi Đấu',
  sponsorsTitle: 'Nhà Tài Trợ Chính Của Sự Kiện',
  sponsorsSubtitle: 'Đồng hành chính thức cùng giải đấu Vanguard Esports Championship 2026.',
  footerCopyright: '© 2026 Vanguard Championship 2026. Bản quyền thuộc Ban Tổ Chức Giải Đấu Esports Quốc Gia.',
  ticketsTitle: 'Đặt Vé Tham Dự Giải Đấu',
  ticketsVenue: 'Nhà Thi Đấu Phú Thọ, Quận 11, TP. Hồ Chí Minh · 18 – 20/12/2026',
  merchTitle: 'Cửa Hàng Merchandise Chính Thức',
  merchSubtitle:
    'Bộ sưu tập giới hạn mùa giải 2026 · Miễn phí vận chuyển toàn quốc cho đơn từ 1.000.000 VNĐ.',
};

export const DEFAULT_SPONSORS: SponsorSlot[] = [
  { id: 'sponsor-1', slotIndex: 1, name: 'Nhà Tài Trợ Chính 01', tierLabel: 'Đối tác Kim Cương', logoUrl: null },
  { id: 'sponsor-2', slotIndex: 2, name: 'Nhà Tài Trợ Chính 02', tierLabel: 'Thiết bị Thi đấu', logoUrl: null },
  { id: 'sponsor-3', slotIndex: 3, name: 'Nhà Tài Trợ Chính 03', tierLabel: 'Viễn thông & Hạ tầng', logoUrl: null },
  { id: 'sponsor-4', slotIndex: 4, name: 'Nhà Tài Trợ Chính 04', tierLabel: 'Nước tăng lực', logoUrl: null },
  { id: 'sponsor-5', slotIndex: 5, name: 'Nhà Tài Trợ Chính 05', tierLabel: 'Trang phục Chính thức', logoUrl: null },
];

export const DEFAULT_FREE_FIRE_TEAMS: TeamEntry[] = [
  // BẢNG A (6 đội)
  { id: 'ff-1', name: 'Saigon Phantom Zero', tag: 'SGPZ', game: 'free-fire', group: 'A', seed: 1, region: 'TP. Hồ Chí Minh', captain: 'Zeph', accentHex: '#F59E0B', logoUrl: null },
  { id: 'ff-2', name: 'Hanoi Blaze Legion', tag: 'HBL', game: 'free-fire', group: 'A', seed: 2, region: 'Hà Nội', captain: 'Kuro', accentHex: '#EF4444', logoUrl: null },
  { id: 'ff-3', name: 'Da Nang Storm', tag: 'DNS', game: 'free-fire', group: 'A', seed: 3, region: 'Đà Nẵng', captain: 'Vortex', accentHex: '#38BDF8', logoUrl: null },
  { id: 'ff-4', name: 'Mekong Apex', tag: 'MKA', game: 'free-fire', group: 'A', seed: 4, region: 'Cần Thơ', captain: 'Sora', accentHex: '#10B981', logoUrl: null },
  { id: 'ff-5', name: 'Nha Trang Vanguard', tag: 'NTV', game: 'free-fire', group: 'A', seed: 5, region: 'Khánh Hòa', captain: 'Minz', accentHex: '#60A5FA', logoUrl: null },
  { id: 'ff-6', name: 'Vung Tau Horizon', tag: 'VTH', game: 'free-fire', group: 'A', seed: 6, region: 'Bà Rịa - VT', captain: 'Ken', accentHex: '#A78BFA', logoUrl: null },

  // BẢNG B (6 đội)
  { id: 'ff-7', name: 'Titan Force VN', tag: 'TFV', game: 'free-fire', group: 'B', seed: 7, region: 'TP. Hồ Chí Minh', captain: 'Neko', accentHex: '#F97316', logoUrl: null },
  { id: 'ff-8', name: 'Red River Wolves', tag: 'RRW', game: 'free-fire', group: 'B', seed: 8, region: 'Hải Phòng', captain: 'Bino', accentHex: '#DC2626', logoUrl: null },
  { id: 'ff-9', name: 'Imperial Falcons', tag: 'IMF', game: 'free-fire', group: 'B', seed: 9, region: 'Huế', captain: 'Khai', accentHex: '#EAB308', logoUrl: null },
  { id: 'ff-10', name: 'Highland Syndicate', tag: 'HLS', game: 'free-fire', group: 'B', seed: 10, region: 'Đà Lạt', captain: 'Draco', accentHex: '#14B8A6', logoUrl: null },
  { id: 'ff-11', name: 'Binh Duong Steel', tag: 'BDS', game: 'free-fire', group: 'B', seed: 11, region: 'Bình Dương', captain: 'Hao', accentHex: '#34D399', logoUrl: null },
  { id: 'ff-12', name: 'Bac Ninh Sentinels', tag: 'BNS', game: 'free-fire', group: 'B', seed: 12, region: 'Bắc Ninh', captain: 'Duy', accentHex: '#FB923C', logoUrl: null },

  // BẢNG C (6 đội)
  { id: 'ff-13', name: 'Crimson Phoenix', tag: 'CPX', game: 'free-fire', group: 'C', seed: 13, region: 'Bình Dương', captain: 'Tuna', accentHex: '#FB7185', logoUrl: null },
  { id: 'ff-14', name: 'Obsidian Five', tag: 'OB5', game: 'free-fire', group: 'C', seed: 14, region: 'Đồng Nai', captain: 'Luka', accentHex: '#94A3B8', logoUrl: null },
  { id: 'ff-15', name: 'Aurora Esports', tag: 'AUR', game: 'free-fire', group: 'C', seed: 15, region: 'Quảng Ninh', captain: 'Ryu', accentHex: '#818CF8', logoUrl: null },
  { id: 'ff-16', name: 'Thanh Hoa Knights', tag: 'THK', game: 'free-fire', group: 'C', seed: 16, region: 'Thanh Hóa', captain: 'Phat', accentHex: '#FBBF24', logoUrl: null },
  { id: 'ff-17', name: 'Long An Vipers', tag: 'LAV', game: 'free-fire', group: 'C', seed: 17, region: 'Long An', captain: 'Tuan', accentHex: '#4ADE80', logoUrl: null },
  { id: 'ff-18', name: 'Nghe An Blaze', tag: 'NAB', game: 'free-fire', group: 'C', seed: 18, region: 'Nghệ An', captain: 'Vu', accentHex: '#F472B6', logoUrl: null },
];

export const DEFAULT_AOV_TEAMS: TeamEntry[] = [
  { id: 'aov-1', name: 'Saigon Valiant', tag: 'SGV', game: 'aov', seed: 1, region: 'TP. Hồ Chí Minh', captain: 'Bang', accentHex: '#F59E0B', logoUrl: null },
  { id: 'aov-2', name: 'Capital Guardians', tag: 'CPG', game: 'aov', seed: 2, region: 'Hà Nội', captain: 'Maris', accentHex: '#38BDF8', logoUrl: null },
  { id: 'aov-3', name: 'Dragon Bridge Gaming', tag: 'DBG', game: 'aov', seed: 3, region: 'Đà Nẵng', captain: 'Hanzo', accentHex: '#EF4444', logoUrl: null },
  { id: 'aov-4', name: 'Delta Knights', tag: 'DLK', game: 'aov', seed: 4, region: 'Cần Thơ', captain: 'Tama', accentHex: '#10B981', logoUrl: null },
  { id: 'aov-5', name: 'Thunderbolt Pro', tag: 'TBP', game: 'aov', seed: 5, region: 'TP. Hồ Chí Minh', captain: 'Gray', accentHex: '#EAB308', logoUrl: null },
  { id: 'aov-6', name: 'Northern Eclipse', tag: 'NEC', game: 'aov', seed: 6, region: 'Hà Nội', captain: 'Kuga', accentHex: '#6366F1', logoUrl: null },
  { id: 'aov-7', name: 'Coastal Royals', tag: 'CSR', game: 'aov', seed: 7, region: 'Vũng Tàu', captain: 'Eris', accentHex: '#2DD4BF', logoUrl: null },
  { id: 'aov-8', name: 'Ironclad Esports', tag: 'ICE', game: 'aov', seed: 8, region: 'Hải Phòng', captain: 'Vex', accentHex: '#F97316', logoUrl: null },
  { id: 'aov-9', name: 'Lotus Legends', tag: 'LTL', game: 'aov', seed: 9, region: 'Đồng Tháp', captain: 'Jiro', accentHex: '#EC4899', logoUrl: null },
];

export const DEFAULT_FF_GROUP_STANDINGS: FreeFireStandingRow[] = [
  { teamId: 'ff-1', matches: 40, booyah: 7, placementPts: 218, killPts: 245 },
  { teamId: 'ff-7', matches: 40, booyah: 6, placementPts: 204, killPts: 232 },
  { teamId: 'ff-13', matches: 40, booyah: 6, placementPts: 198, killPts: 219 },
  { teamId: 'ff-2', matches: 40, booyah: 5, placementPts: 192, killPts: 210 },
  { teamId: 'ff-8', matches: 40, booyah: 4, placementPts: 185, killPts: 198 },
  { teamId: 'ff-14', matches: 40, booyah: 4, placementPts: 179, killPts: 189 },
  { teamId: 'ff-3', matches: 40, booyah: 3, placementPts: 168, killPts: 184 },
  { teamId: 'ff-9', matches: 40, booyah: 3, placementPts: 161, killPts: 175 },
  { teamId: 'ff-15', matches: 40, booyah: 3, placementPts: 155, killPts: 169 },
  { teamId: 'ff-4', matches: 40, booyah: 2, placementPts: 149, killPts: 162 },
  { teamId: 'ff-10', matches: 40, booyah: 2, placementPts: 142, killPts: 154 },
  { teamId: 'ff-16', matches: 40, booyah: 2, placementPts: 136, killPts: 148 },
  { teamId: 'ff-5', matches: 40, booyah: 1, placementPts: 124, killPts: 138 },
  { teamId: 'ff-11', matches: 40, booyah: 1, placementPts: 118, killPts: 129 },
  { teamId: 'ff-17', matches: 40, booyah: 1, placementPts: 112, killPts: 122 },
  { teamId: 'ff-6', matches: 40, booyah: 0, placementPts: 98, killPts: 115 },
  { teamId: 'ff-12', matches: 40, booyah: 0, placementPts: 91, killPts: 104 },
  { teamId: 'ff-18', matches: 40, booyah: 0, placementPts: 84, killPts: 96 },
];

export const DEFAULT_FF_FINAL_STANDINGS: FreeFireStandingRow[] = DEFAULT_FF_GROUP_STANDINGS.slice(
  0,
  12
).map((row) => ({
  teamId: row.teamId,
  matches: 0,
  booyah: 0,
  placementPts: 0,
  killPts: 0,
}));

export const DEFAULT_AOV_STAGE1_STANDINGS: AovStage1StandingRow[] = [
  { teamId: 'aov-1', played: 8, wins: 7, losses: 1, gameDiff: 11, points: 21 },
  { teamId: 'aov-2', played: 8, wins: 7, losses: 1, gameDiff: 9, points: 20 },
  { teamId: 'aov-3', played: 8, wins: 6, losses: 2, gameDiff: 7, points: 18 },
  { teamId: 'aov-4', played: 8, wins: 5, losses: 3, gameDiff: 4, points: 15 },
  { teamId: 'aov-5', played: 8, wins: 4, losses: 4, gameDiff: 1, points: 12 },
  { teamId: 'aov-6', played: 8, wins: 4, losses: 4, gameDiff: -2, points: 11 },
  { teamId: 'aov-7', played: 8, wins: 2, losses: 6, gameDiff: -8, points: 6 },
  { teamId: 'aov-8', played: 8, wins: 1, losses: 7, gameDiff: -10, points: 3 },
  { teamId: 'aov-9', played: 8, wins: 0, losses: 8, gameDiff: -12, points: 2 },
];

export const DEFAULT_AOV_MATCHES: AovMatchEntry[] = [
  { id: 'aov-s1-1', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 1', bestOf: 'Bo3', scheduleTime: '01/12 · 14:00', teamAId: 'aov-1', teamBId: 'aov-2', scoreA: 2, scoreB: 1 },
  { id: 'aov-s1-2', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 1', bestOf: 'Bo3', scheduleTime: '01/12 · 16:30', teamAId: 'aov-3', teamBId: 'aov-4', scoreA: 2, scoreB: 0 },
  { id: 'aov-s1-3', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 2', bestOf: 'Bo3', scheduleTime: '02/12 · 14:00', teamAId: 'aov-5', teamBId: 'aov-6', scoreA: 2, scoreB: 1 },
  { id: 'aov-s1-4', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 2', bestOf: 'Bo3', scheduleTime: '02/12 · 16:30', teamAId: 'aov-7', teamBId: 'aov-8', scoreA: 2, scoreB: 0 },
  { id: 'aov-s1-5', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 3', bestOf: 'Bo3', scheduleTime: '03/12 · 14:00', teamAId: 'aov-1', teamBId: 'aov-3', scoreA: 2, scoreB: 0 },
  { id: 'aov-s1-6', stage: 'stage1', roundLabel: 'Giai đoạn 1 · Lượt 3', bestOf: 'Bo3', scheduleTime: '03/12 · 16:30', teamAId: 'aov-2', teamBId: 'aov-9', scoreA: 2, scoreB: 0 },
  { id: 'aov-sw-r1-1', stage: 'swiss', roundLabel: 'Swiss Vòng 1 (0–0)', bestOf: 'Bo5', scheduleTime: '14/12 · 13:00', teamAId: 'aov-1', teamBId: 'aov-6', scoreA: 3, scoreB: 1 },
  { id: 'aov-sw-r1-2', stage: 'swiss', roundLabel: 'Swiss Vòng 1 (0–0)', bestOf: 'Bo5', scheduleTime: '14/12 · 16:00', teamAId: 'aov-2', teamBId: 'aov-5', scoreA: 3, scoreB: 2 },
  { id: 'aov-sw-r1-3', stage: 'swiss', roundLabel: 'Swiss Vòng 1 (0–0)', bestOf: 'Bo5', scheduleTime: '14/12 · 19:00', teamAId: 'aov-3', teamBId: 'aov-4', scoreA: 3, scoreB: 1 },
  { id: 'aov-sw-r2-1', stage: 'swiss', roundLabel: 'Swiss Vòng 2 · Nhánh Thắng (1–0)', bestOf: 'Bo5', scheduleTime: '15/12 · 14:00', teamAId: 'aov-1', teamBId: 'aov-3', scoreA: 3, scoreB: 2 },
  { id: 'aov-sw-r2-2', stage: 'swiss', roundLabel: 'Swiss Vòng 2 · Nhánh Giữa (1–0 vs 0–1)', bestOf: 'Bo5', scheduleTime: '15/12 · 17:00', teamAId: 'aov-2', teamBId: 'aov-4', scoreA: 3, scoreB: 1 },
  { id: 'aov-sw-r2-3', stage: 'swiss', roundLabel: 'Swiss Vòng 2 · Nhánh Loại (0–1)', bestOf: 'Bo5', scheduleTime: '15/12 · 20:00', teamAId: 'aov-5', teamBId: 'aov-6', scoreA: 3, scoreB: 1 },
  { id: 'aov-sw-r3-1', stage: 'swiss', roundLabel: 'Swiss Vòng 3 · Tranh Suất Chung Kết Thứ 3', bestOf: 'Bo5', scheduleTime: '16/12 · 18:00', teamAId: 'aov-3', teamBId: 'aov-5', scoreA: 3, scoreB: 2 },
];

export const DEFAULT_TOURNAMENT_SCHEDULE: ScheduleItem[] = [
  { id: 'sch-ff-1', phaseKey: 'ff-group', dayLabel: 'Ngày 1 (Lượt 1)', date: '01/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng B (Lần 1)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng B' },
  { id: 'sch-ff-2', phaseKey: 'ff-group', dayLabel: 'Ngày 2 (Lượt 1)', date: '02/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng B vs Bảng C (Lần 1)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng B gặp 6 đội Bảng C' },
  { id: 'sch-ff-3', phaseKey: 'ff-group', dayLabel: 'Ngày 3 (Lượt 1)', date: '03/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng C (Lần 1)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng C' },
  { id: 'sch-ff-4', phaseKey: 'ff-group', dayLabel: 'Ngày 4 (Lượt 2)', date: '04/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng B (Lần 2)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng B' },
  { id: 'sch-ff-5', phaseKey: 'ff-group', dayLabel: 'Ngày 5 (Lượt 2)', date: '05/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng B vs Bảng C (Lần 2)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng B gặp 6 đội Bảng C' },
  { id: 'sch-ff-6', phaseKey: 'ff-group', dayLabel: 'Ngày 6 (Lượt 2)', date: '06/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng C (Lần 2)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng C' },
  { id: 'sch-ff-7', phaseKey: 'ff-group', dayLabel: 'Ngày 7 (Lượt 3)', date: '08/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng B (Lần 3)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng B' },
  { id: 'sch-ff-8', phaseKey: 'ff-group', dayLabel: 'Ngày 8 (Lượt 3)', date: '09/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng B vs Bảng C (Lần 3)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng B gặp 6 đội Bảng C' },
  { id: 'sch-ff-9', phaseKey: 'ff-group', dayLabel: 'Ngày 9 (Lượt 3)', date: '10/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng C (Lần 3)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng C' },
  { id: 'sch-ff-10', phaseKey: 'ff-group', dayLabel: 'Ngày 10 (Lượt 4)', date: '11/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng B (Lần 4)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng A gặp 6 đội Bảng B' },
  { id: 'sch-ff-11', phaseKey: 'ff-group', dayLabel: 'Ngày 11 (Lượt 4)', date: '12/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng B vs Bảng C (Lần 4)', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: '6 đội Bảng B gặp 6 đội Bảng C' },
  { id: 'sch-ff-12', phaseKey: 'ff-group', dayLabel: 'Ngày 12 (Lượt 4)', date: '13/12/2026', time: '18:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Vòng Bảng · Bảng A vs Bảng C (Lần 4) · Chốt Top 12', format: '12 đội/lobby · 5 ván', arena: 'Đấu trường Chính', matchupSummary: 'Tìm ra 12 cái tên tiến vào Chung Kết' },
  { id: 'sch-aov-1', phaseKey: 'aov-stage1', dayLabel: 'Giai đoạn 1 · Tuần 1', date: '01–04/12/2026', time: '14:00 – 20:00', game: 'aov', gameLabel: 'Arena of Valor', stage: 'Giai đoạn 1 · Vòng tròn 9 đội (Lượt 1–4)', format: 'Xoay vòng · Bo3', arena: 'Sân khấu AoV', matchupSummary: '9 đội đấu vòng tròn · Loại 3 đội cuối bảng' },
  { id: 'sch-aov-2', phaseKey: 'aov-stage1', dayLabel: 'Giai đoạn 1 · Tuần 2', date: '06–09/12/2026', time: '14:00 – 20:00', game: 'aov', gameLabel: 'Arena of Valor', stage: 'Giai đoạn 1 · Vòng tròn 9 đội (Lượt 5–9)', format: 'Xoay vòng · Bo3', arena: 'Sân khấu AoV', matchupSummary: 'Chốt BXH Tổng Giai đoạn 1 · Top 6 đi tiếp' },
  { id: 'sch-aov-3', phaseKey: 'aov-swiss', dayLabel: 'Giai đoạn 2 · Swiss', date: '14–16/12/2026', time: '13:00 – 22:00', game: 'aov', gameLabel: 'Arena of Valor', stage: 'Giai đoạn 2 · Vòng Thụy Sĩ (6 đội)', format: 'Swiss System · Bo5', arena: 'Sân khấu Chính · Phú Thọ', matchupSummary: 'Đấu Bo5 tìm 3 đội tiến vào Chung Kết' },
  { id: 'sch-ff-final', phaseKey: 'ff-final', dayLabel: 'Chung Kết', date: '19–20/12/2026', time: '13:00 – 21:30', game: 'free-fire', gameLabel: 'Free Fire', stage: 'Chung Kết Tổng 12 Đội (Chưa công bố điểm)', format: 'Battle Royale · 12 Đội', arena: 'Nhà Thi Đấu Phú Thọ', matchupSummary: 'Top 12 đội vượt qua vòng bảng tranh cúp vô địch' },
  { id: 'sch-aov-final', phaseKey: 'aov-swiss', dayLabel: 'Chung Kết', date: '20/12/2026', time: '18:00 – 22:30', game: 'aov', gameLabel: 'Arena of Valor', stage: 'Chung Kết Tổng Top 3 AoV', format: 'Vòng Chung Kết · Bo7', arena: 'Nhà Thi Đấu Phú Thọ', matchupSummary: '3 đội xuất sắc nhất từ Vòng Thụy Sĩ' },
];

export const DEFAULT_TICKET_DAYS: TicketDayOption[] = [
  { id: 'day-1', label: 'Ngày 1 · 18/12', desc: 'Vòng Bảng & Khai mạc giải đấu', multiplier: 1 },
  { id: 'day-2', label: 'Ngày 2 · 19/12', desc: 'Chung Kết Free Fire Lượt 1 & Vòng Thụy Sĩ AoV', multiplier: 1 },
  { id: 'day-3', label: 'Ngày 3 · 20/12', desc: 'Chung Kết Tổng Free Fire & AoV', multiplier: 1.2 },
  { id: 'combo', label: 'Combo Cả 3 Ngày', desc: 'Vé vào cổng toàn bộ 18–20/12 (Tiết kiệm 15%)', multiplier: 2.55 },
];

export const DEFAULT_TICKET_TIERS: TicketTier[] = [
  {
    id: 'standard',
    name: 'Vé Khán Đài Phổ Thông',
    zone: 'Khu Vực C & D · Khán Đài Tầng 2',
    priceVnd: 250000,
    perks: [
      'Quyền vào cổng cả ngày theo lịch đã chọn',
      'Vòng tay sự kiện & thẻ cổ vũ chính thức',
      'Tham gia các gian hàng trải nghiệm và mini-game',
    ],
    remaining: 184,
  },
  {
    id: 'vip',
    name: 'Vé VIP Arena Pass',
    zone: 'Khu Vực Trung Tâm · Sát Sân Khấu',
    priceVnd: 650000,
    perks: [
      'Ghế ngồi vị trí trung tâm tầm nhìn trực diện màn hình LED',
      'Lối vào ưu tiên không cần xếp hàng',
      'Bộ quà tặng: Huy hiệu kim loại + Dây đeo thẻ VIP + Áo thun cổ vũ',
    ],
    remaining: 48,
  },
  {
    id: 'vvip',
    name: 'Vé VVIP Backstage & Fan Meet',
    zone: 'Hàng Ghế Đầu · Khu Vực Giao Lưu Tuyển Thủ',
    priceVnd: 1450000,
    perks: [
      'Hàng ghế đầu sát bục thi đấu của 12 đội Chung Kết Free Fire & Top 3 AoV',
      'Suất giao lưu, chụp ảnh và ký tặng cùng tuyển thủ sau trận',
      'Hộp quà Collector Edition trị giá 750.000 VNĐ',
    ],
    remaining: 12,
  },
];

export const DEFAULT_MERCH_PRODUCTS: MerchProduct[] = [
  {
    id: 'jersey-2026',
    category: 'Trang phục Thi đấu',
    name: 'Áo Thi Đấu Chính Thức Vanguard 2026',
    priceVnd: 590000,
    imageUrl: '/src/assets/images/merch_pro_jersey_1794922956174.jpg',
    description:
      'Chất liệu vải thể thao thoáng khí 4 chiều, họa tiết hình học ánh kim đặc trưng của mùa giải 2026.',
    sizes: ['S', 'M', 'L', 'XL'],
    availabilityNote: 'Còn hàng',
  },
  {
    id: 'hoodie-champ',
    category: 'Áo Khoác Giải Đấu',
    name: 'Hoodie Nỉ Nặng Championship Edition',
    priceVnd: 980000,
    imageUrl: '/src/assets/images/merch_championship_hoodie_1794922956558.jpg',
    description:
      'Cotton nỉ 450gsm phom dáng rộng, logo giải đấu thêu chỉ ánh vàng nổi bật trước ngực.',
    sizes: ['M', 'L', 'XL'],
    availabilityNote: 'Phiên bản giới hạn',
  },
  {
    id: 'deskmat-cap',
    category: 'Phụ kiện Gaming',
    name: 'Bộ Lót Chuột XXL & Mũ Snapback',
    priceVnd: 640000,
    imageUrl: '/src/assets/images/merch_gaming_deskmat_1794922956838.jpg',
    description:
      'Lót chuột kích thước 900x400x4mm bề mặt kiểm soát tốc độ cao kèm mũ lưỡi trai thêu 3D.',
    sizes: ['Tiêu chuẩn'],
    availabilityNote: 'Còn hàng',
  },
  {
    id: 'collector-box',
    category: 'Bộ Sưu Tập',
    name: 'Hộp Quà Kỷ Niệm Collector Box 2026',
    priceVnd: 750000,
    imageUrl: '/src/assets/images/merch_collector_pack_1794922958516.jpg',
    description:
      'Bao gồm 2 huy hiệu hợp kim đúc nổi, dây đeo thẻ dệt kim tuyến và thẻ cứng kỷ niệm.',
    sizes: ['Hộp tiêu chuẩn'],
    availabilityNote: 'Số lượng có hạn',
  },
];

export function formatVnd(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
}
