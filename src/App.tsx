import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ActiveTokensList } from './components/ActiveTokensList';
import { CanteenMenu } from './components/CanteenMenu';
import { CafeteriaMenu } from './components/CafeteriaMenu';
import { CampusInfoSection } from './components/CampusInfoSection';
import { Footer } from './components/Footer';
import { TokenGeneratorModal } from './components/TokenGeneratorModal';
import { GeneratedToken, MenuItem, UserRole } from './types';

export default function App() {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [preselectedItemId, setPreselectedItemId] = useState<string | undefined>(undefined);
  
  // Local storage persisted tokens
  const [tokens, setTokens] = useState<GeneratedToken[]>(() => {
    try {
      const saved = localStorage.getItem('sb_canteen_tokens');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sb_canteen_tokens', JSON.stringify(tokens));
    } catch (e) {
      console.error('Failed to save tokens to localStorage', e);
    }
  }, [tokens]);

  const handleOpenTokenModal = (role?: UserRole, itemId?: string) => {
    setSelectedRole(role);
    setPreselectedItemId(itemId);
    setIsTokenModalOpen(true);
  };

  const handleTokenGenerated = (newToken: GeneratedToken) => {
    setTokens((prev) => [newToken, ...prev]);
  };

  const handleDeleteToken = (id: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectItemForToken = (item: MenuItem) => {
    handleOpenTokenModal(undefined, item.id);
  };

  const handleScrollToTokens = () => {
    const el = document.getElementById('printable-token-pass') || document.querySelector('section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-amber-400 selection:text-amber-950 flex flex-col">
      {/* Navigation Header */}
      <Header
        onOpenTokenModal={handleOpenTokenModal}
        activeTokenCount={tokens.length}
        onViewTokens={handleScrollToTokens}
      />

      {/* Main Content Area */}
      <main className="grow">
        {/* Hero with Cashless Token Direct Action */}
        <Hero onOpenTokenModal={handleOpenTokenModal} />

        {/* User's Active Online Tokens if any */}
        <ActiveTokensList
          tokens={tokens}
          onDeleteToken={handleDeleteToken}
          onGenerateNew={() => handleOpenTokenModal()}
        />

        {/* Main Canteen Menu (Breakfast, Lunch, All-Day Continuous) */}
        <CanteenMenu onSelectItemForToken={handleSelectItemForToken} />

        {/* Express Cafeteria Menu (Bakery Items, Hot Tea, Coffee) */}
        <CafeteriaMenu onSelectItemForToken={handleSelectItemForToken} />

        {/* Token Protocol & Campus Rules */}
        <CampusInfoSection onOpenTokenModal={handleOpenTokenModal} />
      </main>

      {/* Footer with Designer Credit */}
      <Footer onOpenTokenModal={handleOpenTokenModal} />

      {/* Online Cashless Token Generator Modal */}
      <TokenGeneratorModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
        onTokenGenerated={handleTokenGenerated}
        initialRole={selectedRole}
        preselectedItemId={preselectedItemId}
      />
    </div>
  );
}
