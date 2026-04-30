export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="font-display text-4xl uppercase tracking-wide">Elite Community</h1>
        <p className="font-body text-sm text-white/50">Connect with 150+ active members.</p>
      </div>

      <div className="flex flex-col items-center justify-center text-center card-premium py-24 sm:py-32">
        <div className="w-24 h-24 rounded-full bg-[#2AABEE]/10 flex items-center justify-center text-5xl mb-8 shadow-[0_0_40px_rgba(42,171,238,0.2)] animate-pulse">📱</div>
        <h2 className="font-display text-4xl md:text-5xl mb-6">The Capital Guru Telegram</h2>
        <p className="font-body text-base text-white/70 max-w-lg mx-auto mb-10 leading-relaxed">
          All our discussions, live Q&A sessions, and emergency market updates happen exclusively in our private Telegram group.
        </p>
        <a href="#" className="px-10 py-4 text-sm font-bold text-white bg-[#2AABEE] rounded-xl tracking-widest hover:shadow-[0_0_30px_rgba(42,171,238,0.6)] hover:scale-105 transition-all uppercase flex items-center gap-3">
          Join Secure Chat &rarr;
        </a>
      </div>
    </div>
  );
}
