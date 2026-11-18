import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { formatVnd } from '../data/tournamentData';
import { CartItem, MerchProduct, PageView, SiteCopyConfig } from '../types/esports';

interface MerchPageProps {
  siteCopy: SiteCopyConfig;
  merchProducts: MerchProduct[];
  cart: CartItem[];
  onAddToCart: (productId: string, size: string) => void;
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onClearCart: () => void;
  onNavigate: (page: PageView) => void;
}

export const MerchPage: React.FC<MerchPageProps> = ({
  siteCopy,
  merchProducts,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  const subtotal = cart.reduce((sum, item) => {
    const product = merchProducts.find((p) => p.id === item.productId);
    return sum + (product ? product.priceVnd * item.quantity : 0);
  }, 0);

  const shippingFee = subtotal >= 1000000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shippingFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (cart.length === 0) {
      setFormError('Giỏ hàng hiện đang trống.');
      return;
    }
    if (customerName.trim().length < 2) {
      setFormError('Vui lòng nhập họ tên người nhận hàng.');
      return;
    }
    if (!/^[0-9+\s]{9,13}$/.test(customerPhone.trim())) {
      setFormError('Vui lòng nhập số điện thoại liên hệ hợp lệ.');
      return;
    }
    if (shippingAddress.trim().length < 8) {
      setFormError('Vui lòng nhập địa chỉ giao hàng đầy đủ.');
      return;
    }

    const orderId = `MRC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmedId(orderId);
    onClearCart();
  };

  return (
    <main className="mx-auto max-w-[1360px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-white/10 pb-6">
        <button
          type="button"
          onClick={() => onNavigate('overview')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-amber-400 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Quay lại Trang Giới thiệu Sự kiện</span>
        </button>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white">
          {siteCopy.merchTitle}
        </h1>
        <p className="mt-1 text-sm text-slate-400">{siteCopy.merchSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
          {merchProducts.map((product) => {
            const activeSize =
              selectedSizes[product.id] && product.sizes.includes(selectedSizes[product.id])
                ? selectedSizes[product.id]
                : product.sizes[0] ?? 'Tiêu chuẩn';

            return (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#11131A]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#09090B]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-400">
                      <span>{product.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400">{product.availabilityNote}</span>
                    </div>
                    <h2 className="mt-1.5 text-base font-bold text-white">{product.name}</h2>
                    <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-4 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">Kích cỡ</span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: size }))
                            }
                            className={`rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                              activeSize === size
                                ? 'border-amber-500 bg-amber-500 text-[#09090B]'
                                : 'border-white/15 bg-[#09090B] text-slate-300 hover:border-white/30'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-lg font-bold text-amber-400 tabular-nums">
                        {formatVnd(product.priceVnd)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOrderConfirmedId(null);
                          onAddToCart(product.id, activeSize);
                        }}
                        className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#09090B] transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl border border-white/10 bg-[#11131A] p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-amber-400" />
                <h2 className="font-display text-2xl font-bold text-white">Giỏ Hàng</h2>
              </div>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {cart.reduce((s, i) => s + i.quantity, 0)} sản phẩm
              </span>
            </div>

            {orderConfirmedId ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5">
                  <div className="text-xs font-semibold text-emerald-300">
                    Đặt hàng thành công
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold text-white tabular-nums">
                    {orderConfirmedId}
                  </div>
                  <p className="mt-2 text-xs text-slate-200 leading-relaxed">
                    Đơn hàng Merchandise của <span className="font-semibold">{customerName}</span> đang được đóng gói và sẽ giao tới địa chỉ đã đăng ký (Thanh toán khi nhận hàng - COD).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOrderConfirmedId(null)}
                  className="w-full rounded-lg border border-white/15 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/10 cursor-pointer"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-10 text-center text-sm text-slate-400">
                Chưa có sản phẩm nào trong giỏ hàng. Hãy chọn mẫu Merchandise bạn yêu thích bên cạnh.
              </div>
            ) : (
              <div className="mt-4 space-y-5">
                <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const product = merchProducts.find((p) => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex items-start justify-between gap-3 rounded-lg border border-white/10 bg-[#09090B] p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-xs font-semibold text-white">
                            {product.name}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">
                            Cỡ: {item.size} ·{' '}
                            <span className="font-mono text-amber-400 tabular-nums">
                              {formatVnd(product.priceVnd)}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              aria-label="Giảm số lượng"
                              onClick={() =>
                                onUpdateQuantity(item.productId, item.size, -1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-slate-300 hover:border-amber-400 cursor-pointer"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-semibold text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Tăng số lượng"
                              onClick={() =>
                                onUpdateQuantity(item.productId, item.size, 1)
                              }
                              className="flex h-6 w-6 items-center justify-center rounded border border-white/15 text-slate-300 hover:border-amber-400 cursor-pointer"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label="Xóa sản phẩm"
                          onClick={() => onRemoveItem(item.productId, item.size)}
                          className="p-1 text-slate-500 hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Tạm tính</span>
                    <span className="font-mono text-slate-200 tabular-nums">
                      {formatVnd(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Phí giao hàng</span>
                    <span className="font-mono text-slate-200 tabular-nums">
                      {shippingFee === 0 ? 'Miễn phí' : formatVnd(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-sm font-bold text-amber-400">
                    <span>Tổng thanh toán (COD)</span>
                    <span className="font-mono tabular-nums">{formatVnd(total)}</span>
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-3 border-t border-white/10 pt-4">
                  {formError && (
                    <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                      {formError}
                    </div>
                  )}
                  <input
                    type="text"
                    required
                    placeholder="Họ tên người nhận"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Số điện thoại"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Địa chỉ nhận hàng (Số nhà, Quận, Tỉnh/Thành)"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full rounded-lg border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-amber-500 py-3 text-xs font-semibold text-[#09090B] transition-colors hover:bg-amber-400 cursor-pointer"
                  >
                    Đặt Mua Merchandise
                  </button>
                </form>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
};
