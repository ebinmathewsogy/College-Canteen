import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollegeCampusShowcase } from './components/CollegeCampusShowcase';
import { CanteenMenu } from './components/CanteenMenu';
import { ActiveTokensList } from './components/ActiveTokensList';
import { CampusInfoSection } from './components/CampusInfoSection';
import { Footer } from './components/Footer';
import { TokenGeneratorModal } from './components/TokenGeneratorModal';
import { StorageInspectorModal } from './components/StorageInspectorModal';
import { GeneratedToken, MenuItem, UserRole } from './types';
import { 
  saveTokenToFirestore, 
  deleteTokenFromFirestore, 
  subscribeToCanteenTokens 
} from './services/canteenService';
import { Ticket, ChevronUp, Database } from 'lucide-react';

export default function App() {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [preselectedItem, setPreselectedItem] = useState<MenuItem | undefined>(undefined);
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('all');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Local storage persisted tokens
  const [tokens, setTokens] = useState<GeneratedToken[]>(() => {
    try {
      const saved = localStorage.getItem('sb_canteen_tokens');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Could not read from localStorage', e);
      return [];
    }
  });

  // Track scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync tokens to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('sb_canteen_tokens', JSON.stringify(tokens));
    } catch (e) {
      console.error('Failed to save tokens to localStorage', e);
    }
  }, [tokens]);

  // Real-time Firestore synchronization for collaborative dining counters
  useEffect(() => {
    const unsubscribe = subscribeToCanteenTokens((cloudTokens) => {
      setTokens((prevLocal) => {
        const map = new Map<string, GeneratedToken>();
        prevLocal.forEach((t) => map.set(t.id, t));
        cloudTokens.forEach((t) => map.set(t.id, t));
        const merged = Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
        try {
          localStorage.setItem('sb_canteen_tokens', JSON.stringify(merged));
        } catch {
          // ignore
        }
        return merged;
      });
    });

    return () => unsubscribe();
  }, []);

  const handleOpenTokenModal = (role?: UserRole, item?: MenuItem) => {
    setSelectedRole(role);
    setPreselectedItem(item);
    setIsTokenModalOpen(true);
  };

  const handleSelectItemForToken = (item: MenuItem) => {
    handleOpenTokenModal(undefined, item);
  };

  const handleTokenGenerated = async (newToken: GeneratedToken) => {
    setTokens((prev) => [newToken, ...prev.filter((t) => t.id !== newToken.id)]);
    // Save to Firestore
    await saveTokenToFirestore(newToken);
  };

  const handleCancelToken = async (tokenId: string) => {
    setTokens((prev) => prev.filter((t) => t.id !== tokenId));
    // Remove from Firestore
    await deleteTokenFromFirestore(tokenId);
  };

  const handleClearStorage = () => {
    setTokens([]);
    try {
      localStorage.removeItem('sb_canteen_tokens');
    } catch {
      // ignore
    }
  };

  const handlePrintToken = (token: GeneratedToken) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const itemsHtml = token.items
      .map(
        (i) =>
          `<div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:13px;">
            <span>${i.quantity}x ${i.name}</span>
            <span style="font-weight:bold;">₹${i.price * i.quantity}</span>
          </div>`
      )
      .join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Token Pass - ${token.tokenNumber}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              padding: 24px;
              color: #111;
              max-width: 380px;
              margin: 0 auto;
            }
            .ticket {
              border: 2px dashed #7b1122;
              padding: 20px;
              border-radius: 16px;
              text-align: center;
            }
            .college {
              font-size: 11px;
              font-weight: 800;
              letter-spacing: 1px;
              color: #7b1122;
              text-transform: uppercase;
            }
            .token-no {
              font-size: 32px;
              font-weight: 900;
              font-family: monospace;
              color: #7b1122;
              margin: 12px 0 6px;
            }
            .counter {
              font-size: 13px;
              font-weight: 700;
              color: #333;
            }
            .divider {
              border-top: 1px solid #ddd;
              margin: 14px 0;
            }
            .qr {
              margin: 12px 0;
              width: 140px;
              height: 140px;
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="college">St. Berchmans College, Changanassery</div>
            <div style="font-size:13px; margin-top:2px;">Central Campus Canteen Dining Pass</div>
            <div class="token-no">${token.tokenNumber}</div>
            <div class="counter">${token.counter}</div>
            
            <div class="divider"></div>
            
            <div style="text-align:left; font-size:12px; margin-bottom:12px;">
              <div><strong>Name:</strong> ${token.personName}</div>
              <div><strong>ID / Roll:</strong> ${token.personIdentifier}</div>
              <div><strong>Role:</strong> ${token.role.toUpperCase()}</div>
              <div><strong>Issued:</strong> ${token.timestamp}</div>
            </div>

            <div class="divider"></div>
            
            <div style="text-align:left;">
              ${itemsHtml}
            </div>

            <div class="divider"></div>

            <div style="display:flex; justify-content:space-between; font-size:16px; font-weight:bold; color:#7b1122;">
              <span>TOTAL PAID</span>
              <span>₹${token.totalAmount}</span>
            </div>

            ${
              token.qrCodeUrl
                ? `<img class="qr" src="${token.qrCodeUrl}" alt="QR" />`
                : ''
            }
            <div style="font-size:10px; color:#666;">Present this digital slip at food distribution desk</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#7b1122] selection:text-white">
      {/* College Header */}
      <Header
        activeTokenCount={tokens.length}
        onOpenTokenModal={() => handleOpenTokenModal()}
        onOpenStorageModal={() => setIsStorageModalOpen(true)}
      />

      {/* Hero Section with Live Dining Session Clock */}
      <Hero
        onOpenTokenModal={handleOpenTokenModal}
      />

      {/* Meal Timings & Rates Schedule Showcase */}
      <CollegeCampusShowcase 
        onSelectCategory={(cat) => setActiveMenuCategory(cat)}
      />

      {/* Active Tokens List */}
      <ActiveTokensList
        tokens={tokens}
        onCancelToken={handleCancelToken}
        onOpenTokenModal={() => handleOpenTokenModal()}
        onPrintToken={handlePrintToken}
      />

      {/* Main Canteen Menu */}
      <main className="grow">
        <CanteenMenu 
          onSelectItemForToken={handleSelectItemForToken} 
          activeCategoryOverride={activeMenuCategory}
        />

        {/* Campus Information & Timings Section */}
        <CampusInfoSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Quick-Token Action Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            className="w-11 h-11 rounded-2xl bg-white text-slate-700 shadow-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all cursor-pointer"
            title="Back to Top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => handleOpenTokenModal()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-amber-400/30 border border-amber-200 flex items-center gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <Ticket className="w-4 h-4 text-slate-950" />
          <span>Get Food Token</span>
          {tokens.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-black text-xs animate-pulse">
              {tokens.length}
            </span>
          )}
        </button>
      </div>

      {/* Modals */}
      <TokenGeneratorModal
        isOpen={isTokenModalOpen}
        onClose={() => {
          setIsTokenModalOpen(false);
          setPreselectedItem(undefined);
        }}
        onTokenGenerated={handleTokenGenerated}
        initialRole={selectedRole}
        preselectedItem={preselectedItem}
      />

      <StorageInspectorModal
        isOpen={isStorageModalOpen}
        onClose={() => setIsStorageModalOpen(false)}
        tokens={tokens}
        onClearStorage={handleClearStorage}
      />
    </div>
  );
}
