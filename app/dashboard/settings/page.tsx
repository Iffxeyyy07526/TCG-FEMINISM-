export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-wide">Settings</h1>
        <p className="font-body text-sm text-white/50">Manage your account and preferences.</p>
      </div>

      <div className="space-y-6">
        <div className="card-premium p-6 sm:p-8">
          <h2 className="font-display text-xl mb-6 border-b border-white/10 pb-4">Profile Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">Full Name</label>
              <input type="text" defaultValue="Rahul Singh" className="w-full bg-[#0F0F0F] border border-white/10 rounded-xl px-4 py-3 font-body text-white text-sm focus:border-tcg-green outline-none transition-colors" />
            </div>
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-white/50 block mb-2">Email Address</label>
              <input type="email" defaultValue="rahul@example.com" disabled className="w-full bg-white/5 border border-transparent rounded-xl px-4 py-3 font-body text-white/50 text-sm cursor-not-allowed" />
            </div>
          </div>
          <div className="mt-8">
            <button className="px-8 py-3 text-xs font-bold text-black bg-tcg-green rounded-xl tracking-widest uppercase hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(57,255,20,0.3)]">Save Changes</button>
          </div>
        </div>

        <div className="card-premium p-6 sm:p-8">
          <h2 className="font-display text-xl mb-6 border-b border-white/10 pb-4">Subscription Details</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#0F0F0F] border border-tcg-green/30 p-6 rounded-2xl gap-4">
            <div>
              <div className="font-body font-bold text-xl text-tcg-green flex items-center gap-2 mb-1">Pro Plan <span className="text-amber-400">⭐</span></div>
              <div className="font-body text-sm text-white/50">Renews on: Dec 31, 2026</div>
            </div>
            <button className="px-6 py-2.5 text-xs font-bold text-tcg-green border border-tcg-green/30 rounded-lg tracking-widest hover:bg-tcg-green/10 transition-all uppercase w-full sm:w-auto">Manage Billing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
