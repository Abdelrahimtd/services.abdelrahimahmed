"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

/* ─── Types ─── */
interface Order {
  id: string;
  order_code: string;
  customer_name: string;
  customer_phone: string;
  items: { product_name: string; plan_name: string; price: number; qty: number }[];
  total: number;
  status: string;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  name_ar: string;
  category: string;
  category_label: string;
  icon_url: string;
  description: string;
  rating: number;
  in_stock: boolean;
  features: string[];
  plans: { id: string; name: string; period: string; price: number; warranty: boolean }[];
  badges: string[];
  tags: string[];
  sort_order: number;
  cost_price: number;
  stock_quantity: number;
  total_sold: number;
}

const STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Pending",
  confirmed: "✅ Confirmed",
  delivered: "📦 Delivered",
  cancelled: "❌ Cancelled",
};

/* ═══════════════════════════════════════════ */
export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<"dashboard" | "orders" | "products">("dashboard");

  // Always require fresh login
  useEffect(() => {
    supabase.auth.signOut().then(() => setUser(null));
  }, []);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setLoginError(error.message);
      else if (data.user) setUser(data.user);
    } catch (err: any) {
      setLoginError("Connection error: " + (err.message || "unknown"));
    }
    setLoginLoading(false);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  /* ── Login ── */
  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={signIn} className="bg-bg-card border border-border rounded-2xl p-8 w-full max-w-sm">
          <h1 className="text-2xl font-black mb-1 text-center" style={{ fontFamily: "var(--font-display)" }}>Admin Login</h1>
          <p className="text-text-muted text-sm text-center mb-6">Sign in to manage your store</p>
          <label className="block text-xs text-text-muted mb-1 font-bold">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-teal mb-3" required />
          <label className="block text-xs text-text-muted mb-1 font-bold">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-bg-input border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-teal mb-4" required />
          {loginError && <p className="text-red text-sm mb-3 text-center">{loginError}</p>}
          <button type="submit" disabled={loginLoading}
            className="w-full py-3 rounded-full bg-teal text-text-primary font-bold text-sm cursor-pointer hover:bg-teal/80 transition-colors disabled:opacity-60">
            {loginLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-10 px-4 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "var(--font-display)" }}>
          🔧 Admin Panel
        </h1>
        <div className="flex items-center gap-2">
          <a href="/" className="px-3 py-2 rounded-full border border-border text-text-secondary text-xs font-bold hover:border-teal transition-colors no-underline">🏠 Store</a>
          <button onClick={signOut} className="px-4 py-2 rounded-full border border-red text-red text-xs font-bold cursor-pointer hover:bg-red/10 transition-colors">Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([["dashboard", "📊 Dashboard"], ["orders", "📦 Orders"], ["products", "🏷 Products"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-5 py-2 rounded-full text-sm font-bold cursor-pointer transition-colors border ${
              tab === key ? "bg-teal text-text-primary border-teal" : "bg-transparent text-text-secondary border-border hover:border-teal"
            }`}>{label}</button>
        ))}
      </div>

      {tab === "dashboard" && <DashboardTab />}
      {tab === "orders" && <OrdersTab />}
      {tab === "products" && <ProductsTab />}
    </section>
  );
}

/* ═══════════════════════════════════════════ */
/* DASHBOARD TAB                               */
/* ═══════════════════════════════════════════ */
function DashboardTab() {
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0, delivered: 0, products: 0 });

  useEffect(() => {
    (async () => {
      const [ordersRes, productsRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/products"),
      ]);
      const ordersJson = await ordersRes.json();
      const productsJson = await productsRes.json();
      const orders = ordersJson.orders || [];
      setStats({
        total: orders.length,
        pending: orders.filter((o: Order) => o.status === "pending").length,
        revenue: orders.reduce((s: number, o: Order) => s + (o.total || 0), 0),
        delivered: orders.filter((o: Order) => o.status === "delivered").length,
        products: (productsJson.products || []).length,
      });
    })();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          ["Total Orders", stats.total, "text-teal"],
          ["Pending", stats.pending, "text-yellow-400"],
          ["Delivered", stats.delivered, "text-green-400"],
          ["Revenue", `EGP ${stats.revenue.toLocaleString()}`, "text-teal"],
          ["Products", stats.products, "text-purple-400"],
        ].map(([label, value, color]) => (
          <div key={label as string} className="bg-bg-card border border-border rounded-xl p-4">
            <div className="text-text-muted text-xs mb-1">{label}</div>
            <div className={`font-[family-name:var(--font-mono)] text-xl font-bold ${color}`}>{value}</div>
          </div>
        ))}
      </div>
      <div className="bg-bg-card border border-border rounded-2xl p-8 text-center">
        <p className="text-text-secondary text-lg">Welcome to the Admin Panel 👋</p>
        <p className="text-text-muted text-sm mt-2">Use the tabs above to manage orders and products.</p>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════ */
/* ORDERS TAB                                  */
/* ═══════════════════════════════════════════ */
function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = useCallback(async () => {
    const url = filter === "all" ? "/api/admin/orders" : `/api/admin/orders?status=${filter}`;
    const res = await fetch(url);
    const json = await res.json();
    setOrders(json.orders || []);
  }, [filter]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdatingId(orderId);
    const res = await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: orderId, status: newStatus }),
    });
    const json = await res.json();
    if (json.error) alert("❌ Failed: " + json.error);
    else await loadOrders();
    setUpdatingId(null);
  }

  return (
    <>
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "pending", "confirmed", "delivered", "cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-colors border ${
              filter === s ? "bg-teal text-text-primary border-teal" : "bg-transparent text-text-secondary border-border hover:border-teal"
            }`}>{s === "all" ? "All" : STATUS_LABELS[s] || s}</button>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="bg-bg-card border border-border rounded-2xl p-12 text-center"><p className="text-text-muted">No orders found</p></div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const items = order.items || [];
            const isUpdating = updatingId === order.id;
            return (
              <div key={order.id} className="bg-bg-card border border-border rounded-xl p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-mono)] text-teal font-bold text-sm">{order.order_code}</span>
                    <span className={`text-xs font-bold ${
                      order.status === "pending" ? "text-yellow-400" :
                      order.status === "confirmed" ? "text-teal" :
                      order.status === "delivered" ? "text-green-400" : "text-red"
                    }`}>{STATUS_LABELS[order.status] || order.status}</span>
                  </div>
                  <span className="text-text-muted text-xs">{new Date(order.created_at).toLocaleDateString("en-GB")}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="text-text-secondary text-sm">{items.map((i) => `${i.product_name} ×${i.qty}`).join(", ") || "—"}</div>
                  <span className="font-[family-name:var(--font-mono)] text-teal font-bold">EGP {order.total}</span>
                </div>
                {(order.customer_name || order.customer_phone) && (
                  <div className="text-text-muted text-xs mb-3">👤 {order.customer_name || "—"} | 📱 {order.customer_phone || "—"}</div>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)} disabled={isUpdating}
                    className="bg-bg-input border border-border rounded-lg px-3 py-1.5 text-text-primary text-xs font-bold outline-none focus:border-teal cursor-pointer disabled:opacity-50">
                    <option value="pending">⏳ Pending</option>
                    <option value="confirmed">✅ Confirmed</option>
                    <option value="delivered">📦 Delivered</option>
                    <option value="cancelled">❌ Cancelled</option>
                  </select>
                  <button onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-bold cursor-pointer hover:border-teal hover:text-text-primary transition-colors">
                    {expandedId === order.id ? "✕ Close" : "👁 View"}
                  </button>
                  <a href={`https://wa.me/201116745020?text=${encodeURIComponent(`Order: ${order.order_code} | Status: ${order.status} | Total: EGP ${order.total}`)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-bold no-underline hover:bg-[#20BD5A] transition-colors">💬 WhatsApp</a>
                  {isUpdating && <span className="text-text-muted text-xs animate-pulse">Saving...</span>}
                </div>
                {expandedId === order.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="bg-bg-input rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead><tr className="text-text-muted text-xs">
                          <th className="text-right px-3 py-2">Product</th><th className="text-right px-3 py-2">Plan</th>
                          <th className="text-right px-3 py-2">Price</th><th className="text-right px-3 py-2">Qty</th>
                        </tr></thead>
                        <tbody>{items.map((item, i) => (
                          <tr key={i} className="border-t border-border">
                            <td className="px-3 py-2 font-bold">{item.product_name}</td>
                            <td className="px-3 py-2 text-text-secondary">{item.plan_name}</td>
                            <td className="px-3 py-2 font-[family-name:var(--font-mono)] text-teal">EGP {item.price}</td>
                            <td className="px-3 py-2 font-[family-name:var(--font-mono)]">{item.qty}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                    <div className="mt-2 text-xs text-text-muted">📅 {new Date(order.created_at).toLocaleString()}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════ */
/* PRODUCTS TAB                                */
/* ═══════════════════════════════════════════ */
function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = useCallback(async () => {
    const res = await fetch("/api/admin/products");
    const json = await res.json();
    setProducts(json.products || []);
  }, []);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    loadProducts();
  }

  function startEdit(p: Product | null) {
    setEditing(p);
    setShowForm(true);
  }

  async function saveProduct(data: any) {
    if (editing) {
      await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editing.id, ...data }),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }
    setShowForm(false);
    setEditing(null);
    loadProducts();
  }

  if (showForm) {
    return <ProductForm product={editing} onSave={saveProduct} onCancel={() => { setShowForm(false); setEditing(null); }} />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-text-secondary text-sm">{products.length} products</span>
        <button onClick={() => startEdit(null)}
          className="px-4 py-2 rounded-full bg-teal text-text-primary text-sm font-bold cursor-pointer hover:bg-teal/80 transition-colors">
          + Add Product
        </button>
      </div>

      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-bg-card border border-border rounded-xl p-4 flex items-center gap-4">
            <img src={p.icon_url} alt="" className="w-10 h-10 rounded-lg bg-bg-input object-contain flex-shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm">{p.name_ar}</div>
              <div className="text-text-muted text-xs">{p.name} · {p.category_label}</div>
              {p.badges?.length > 0 && (
                <div className="flex gap-1 mt-1 flex-wrap">
                  {p.badges.map((b, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-teal-soft text-teal font-bold">{b}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="text-right whitespace-nowrap">
              <div className="font-[family-name:var(--font-mono)] text-teal text-sm font-bold">
                EGP {p.plans?.[0]?.price || 0}
              </div>
              {p.cost_price > 0 && <div className="text-text-muted text-[10px]">Cost: EGP {p.cost_price}</div>}
              {p.stock_quantity > 0 && <div className="text-[10px]">📦 {p.stock_quantity}</div>}
            </div>
            <div className="text-xs">{p.in_stock ? "✅" : "❌"}</div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)}
                className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-bold cursor-pointer hover:border-teal transition-colors">Edit</button>
              <button onClick={() => deleteProduct(p.id)}
                className="px-3 py-1.5 rounded-lg border border-red text-red text-xs font-bold cursor-pointer hover:bg-red/10 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════ */
/* PRODUCT FORM                                */
/* ═══════════════════════════════════════════ */
function ProductForm({ product, onSave, onCancel }: { product: Product | null; onSave: (d: any) => void; onCancel: () => void }) {
  const [name, setName] = useState(product?.name || "");
  const [nameAr, setNameAr] = useState(product?.name_ar || "");
  const [category, setCategory] = useState(product?.category || "ai");
  const [categoryLabel, setCategoryLabel] = useState(product?.category_label || "AI & PRODUCTIVITY");
  const [iconUrl, setIconUrl] = useState(product?.icon_url || "");
  const [description, setDescription] = useState(product?.description || "");
  const [rating, setRating] = useState(String(product?.rating || 4.5));
  const [inStock, setInStock] = useState(product?.in_stock !== false);
  const [features, setFeatures] = useState((product?.features || []).join("\n"));
  const [plansJson, setPlansJson] = useState(JSON.stringify(product?.plans || [{ id: "shared", name: "Shared", period: "1 Month", price: 100, warranty: true }], null, 2));
  const [badges, setBadges] = useState((product?.badges || ["ضمان كامل"]).join("\n"));
  const [tags, setTags] = useState((product?.tags || []).join("\n"));
  const [sortOrder, setSortOrder] = useState(String(product?.sort_order || 0));
  const [costPrice, setCostPrice] = useState(String(product?.cost_price || 0));
  const [stockQty, setStockQty] = useState(String(product?.stock_quantity || 0));
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    let plans;
    try { plans = JSON.parse(plansJson); } catch { alert("Invalid plans JSON"); setSaving(false); return; }
    await onSave({
      name, name_ar: nameAr, category, category_label: categoryLabel,
      icon_url: iconUrl, description, rating: parseFloat(rating) || 4.5,
      in_stock: inStock, features: features.split("\n").filter((l) => l.trim()),
      plans, badges: badges.split("\n").filter((l) => l.trim()),
      tags: tags.split("\n").filter((l) => l.trim()),
      sort_order: parseInt(sortOrder) || 0,
      cost_price: parseFloat(costPrice) || 0,
      stock_quantity: parseInt(stockQty) || 0,
    });
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-bg-card border border-border rounded-2xl p-6">
      <h3 className="text-lg font-black mb-4" style={{ fontFamily: "var(--font-display)" }}>
        {product ? "Edit Product" : "Add Product"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Name (English)</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" required /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Name (Arabic)</label>
          <input value={nameAr} onChange={(e) => setNameAr(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" required /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal">
            <option value="ai">AI & PRODUCTIVITY</option><option value="creative">CREATIVE TOOLS</option>
            <option value="productivity">PRODUCTIVITY</option><option value="streaming">STREAMING</option>
          </select></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Category Label</label>
          <input value={categoryLabel} onChange={(e) => setCategoryLabel(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" /></div>
        <div className="sm:col-span-2"><label className="block text-xs text-text-muted mb-1 font-bold">Icon URL</label>
          <input value={iconUrl} onChange={(e) => setIconUrl(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" placeholder="https://..." /></div>
        <div className="sm:col-span-2"><label className="block text-xs text-text-muted mb-1 font-bold">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal resize-y" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Rating</label>
          <input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">In Stock</label>
          <select value={String(inStock)} onChange={(e) => setInStock(e.target.value === "true")} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal">
            <option value="true">Yes</option><option value="false">No</option>
          </select></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">💰 Cost Price (EGP)</label>
          <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" placeholder="0" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">📦 Stock Quantity</label>
          <input type="number" value={stockQty} onChange={(e) => setStockQty(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" placeholder="0" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Sort Order</label>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Features (one per line)</label>
          <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal resize-y font-[family-name:var(--font-mono)]" /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Badges (one per line)</label>
          <textarea value={badges} onChange={(e) => setBadges(e.target.value)} rows={4} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal resize-y"
            placeholder={"حساب جاهز\nضمان كامل"} /></div>
        <div><label className="block text-xs text-text-muted mb-1 font-bold">Tags (one per line)</label>
          <textarea value={tags} onChange={(e) => setTags(e.target.value)} rows={4} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal resize-y"
            placeholder={"+6 مبيعاً\nمميز"} /></div>
        <div className="sm:col-span-2"><label className="block text-xs text-text-muted mb-1 font-bold">Plans (JSON)</label>
          <textarea value={plansJson} onChange={(e) => setPlansJson(e.target.value)} rows={5} className="w-full bg-bg-input border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-teal resize-y font-[family-name:var(--font-mono)]" /></div>
      </div>
      <div className="flex gap-3 mt-6">
        <button type="submit" disabled={saving}
          className="px-6 py-2.5 rounded-full bg-teal text-text-primary font-bold text-sm cursor-pointer hover:bg-teal/80 transition-colors disabled:opacity-60">
          {saving ? "Saving..." : product ? "Update" : "Create"}
        </button>
        <button type="button" onClick={onCancel}
          className="px-6 py-2.5 rounded-full border border-border text-text-secondary font-bold text-sm cursor-pointer hover:border-teal transition-colors">Cancel</button>
      </div>
    </form>
  );
}
