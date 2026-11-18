import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, MapPin, Minus, Plus, Ticket } from 'lucide-react';
import { formatVnd } from '../data/tournamentData';
import { PageView, SiteCopyConfig, TicketDayOption, TicketTier } from '../types/esports';

interface TicketsPageProps {
  siteCopy: SiteCopyConfig;
  ticketDays: TicketDayOption[];
  ticketTiers: TicketTier[];
  onNavigate: (page: PageView) => void;
}

export const TicketsPage: React.FC<TicketsPageProps> = ({
  siteCopy,
  ticketDays,
  ticketTiers,
  onNavigate,
}) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(ticketTiers[1]?.id ?? ticketTiers[0]?.id ?? '');
  const [selectedDayId, setSelectedDayId] = useState<string>(ticketDays[2]?.id ?? ticketDays[0]?.id ?? '');
  const [quantity, setQuantity] = useState<number>(2);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(null);

  useEffect(() => {
    if (!ticketTiers.some((t) => t.id === selectedTierId) && ticketTiers[0]) {
      setSelectedTierId(ticketTiers[0].id);
    }
  }, [ticketTiers, selectedTierId]);

  useEffect(() => {
    if (!ticketDays.some((d) => d.id === selectedDayId) && ticketDays[0]) {
      setSelectedDayId(ticketDays[0].id);
    }
  }, [ticketDays, selectedDayId]);

  const selectedTier = ticketTiers.find((t) => t.id === selectedTierId) ?? ticketTiers[0];
  const selectedDay = ticketDays.find((d) => d.id === selectedDayId) ?? ticketDays[0];

  if (!selectedTier || !selectedDay) return null;

  const unitPrice = Math.round((selectedTier.priceVnd * selectedDay.multiplier) / 1000) * 1000;
  const totalAmount = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (fullName.trim().length < 2) {
      setFormError('Vui lòng nhập họ và tên người nhận vé.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Vui lòng nhập địa chỉ email hợp lệ để nhận mã vé điện tử.');
      return;
    }
    if (!/^[0-9+\s]{9,13}$/.test(phone.trim())) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ (9–11 chữ số).');
      return;
    }

    const randomCode = `VE-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderCode(randomCode);
  };

  return (
    <main className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <button
            type="button"
            onClick={() => onNavigate('overview')}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-amber-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại Trang Giới thiệu Sự kiện</span>
          </button>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white">
            {siteCopy.ticketsTitle}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>{siteCopy.ticketsVenue}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <section>
            <h2 className="font-display text-2xl font-bold text-white">
              01. Chọn Ngày Thi Đấu
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ticketDays.map((day) => {
                const active = day.id === selectedDayId;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => {
                      setSelectedDayId(day.id);
                      setConfirmedOrderCode(null);
                    }}
                    className={`rounded-xl border p-4 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-white/10 bg-[#11131A] hover:border-white/25'
                    }`}
                  >
                    <div className="text-sm font-semibold text-white">{day.label}</div>
                    <div className="mt-1 text-xs text-slate-400">{day.desc}</div>
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white">
              02. Chọn Hạng Vé &amp; Khu Vực Ngồi
            </h2>
            <div className="mt-4 space-y-4">
              {ticketTiers.map((tier) => {
                const active = tier.id === selectedTierId;
                const computedPrice =
                  Math.round((tier.priceVnd * selectedDay.multiplier) / 1000) * 1000;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setSelectedTierId(tier.id);
                      setConfirmedOrderCode(null);
                    }}
                    className={`w-full rounded-xl border p-5 text-left transition-colors cursor-pointer ${
                      active
                        ? 'border-amber-500 bg-amber-500/[0.08]'
                        : 'border-white/10 bg-[#11131A] hover:border-white/25'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="text-xs font-medium text-amber-400">{tier.zone}</div>
                        <div className="mt-0.5 text-lg font-bold text-white">{tier.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-bold text-amber-400 tabular-nums">
                          {formatVnd(computedPrice)}
                        </div>
                        <div className="text-xs text-slate-400 tabular-nums">
                          Còn {tier.remaining} vé
                        </div>
                      </div>
                    </div>

                    <ul className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-xs text-slate-300">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-xl border border-white/10 bg-[#11131A] p-6">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Ticket className="h-5 w-5 text-amber-400" />
              <h2 className="font-display text-2xl font-bold text-white">
                Thông Tin Đặt Vé
              </h2>
            </div>

            {confirmedOrderCode ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                  <div className="text-xs font-semibold text-emerald-300">
                    Đặt vé thành công
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                    {confirmedOrderCode}
                  </div>
                  <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                    Vé điện tử đã được gửi tới email <span className="font-semibold">{email}</span>.
                    Vui lòng xuất trình mã đơn hàng tại cổng check-in.
                  </p>
                </div>

                <div className="space-y-2 rounded-lg border border-white/10 bg-[#09090B] p-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Người nhận</span>
                    <span className="font-semibold text-white">{fullName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Hạng vé</span>
                    <span className="font-semibold text-white">{selectedTier.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Lịch tham dự</span>
                    <span className="font-semibold text-white">{selectedDay.label}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Số lượng</span>
                    <span className="font-mono font-semibold text-white tabular-nums">
                      {quantity} vé
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-amber-400">
                    <span>Tổng thanh toán</span>
                    <span className="font-mono tabular-nums">{formatVnd(totalAmount)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setConfirmedOrderCode(null)}
                  className="w-full rounded-lg border border-white/15 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Đặt thêm vé khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="space-y-2 rounded-lg border border-white/10 bg-[#09090B] p-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Ngày tham dự</span>
                    <span className="font-semibold text-white">{selectedDay.label}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Hạng vé</span>
                    <span className="font-semibold text-white">{selectedTier.name}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-slate-300 font-medium">Số lượng vé</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Giảm số lượng vé"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-[#14171F] text-slate-200 hover:border-amber-400 cursor-pointer"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center font-mono text-sm font-bold text-white tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Tăng số lượng vé"
                        onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-white/15 bg-[#14171F] text-slate-200 hover:border-amber-400 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Họ và tên người nhận vé
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn An"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Email nhận vé điện tử (QR)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Số điện thoại liên hệ
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
                  <span className="text-sm text-slate-300">Tổng cộng</span>
                  <span className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                    {formatVnd(totalAmount)}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-[#09090B] transition-colors hover:bg-amber-400 cursor-pointer"
                >
                  Xác Nhận Đặt Vé
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
