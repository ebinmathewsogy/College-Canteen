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

export default function App() {
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isStorageModalOpen, setIsStorageModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | undefined>(undefined);
  const [preselectedItem, setPreselectedItem] = useState<MenuItem | undefined>(undefined);

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
        // Merge cloud tokens with local ones without duplicates
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
    setTokens((prev) => [newToken, ...prev]);
    // Save to Firestore cloud database
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
            <div class="college">St. Berchmans College Changanassery</div>
            <div style="font-size: 15px; font-weight: bold; margin-top: 2px;">Campus Canteen Cashless Token Pass</div>
            <div class="token-no">${token.tokenNumber}</div>
            <div class="counter">${token.counter} (${token.role.toUpperCase()})</div>
            
            <div class="divider"></div>
            
            <div style="text-align:left; font-size:12px; margin-bottom:12px; line-height:1.6;">
              <div><strong>Name:</strong> ${token.personName}</div>
              <div><strong>ID/Dept:</strong> ${token.personIdentifier}</div>
              <div><strong>Time:</strong> ${token.timestamp}</div>
            </div>

            <div class="divider"></div>

            <div style="text-align:left;">
              ${itemsHtml}
              <div style="display:flex; justify-content:space-between; margin-top:8px; padding-top:8px; border-top:1px solid #111; font-weight:900; font-size:15px;">
                <span>Total Amount:</span>
                <span>₹${token.totalAmount}</span>
              </div>
            </div>

            ${
              token.qrCodeUrl
                ? `<img class="qr" src="${token.qrCodeUrl}" alt="QR" />`
                : ''
            }

            <div style="font-size:10px; color:#666; margin-top:12px;">
              Designed by Ebin Mathew Sogy • SB College
            </div>
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* College Header */}
      <Header
        activeTokenCount={tokens.length}
        onOpenTokenModal={() => handleOpenTokenModal()}
        onOpenStorageModal={() => setIsStorageModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenTokenModal={handleOpenTokenModal}
      />

      {/* College Campus Photo & Full-Time Highlights Showcase */}
      <CollegeCampusShowcase />

      {/* Active Tokens List */}
      <ActiveTokensList
        tokens={tokens}
        onCancelToken={handleCancelToken}
        onOpenTokenModal={() => handleOpenTokenModal()}
        onPrintToken={handlePrintToken}
      />

      {/* Main Canteen Menu */}
      <main className="grow">
        <CanteenMenu onSelectItemForToken={handleSelectItemForToken} />

        {/* Campus Information & Timings Section */}
        <CampusInfoSection />
      </main>

      {/* Footer */}
      <Footer />

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
