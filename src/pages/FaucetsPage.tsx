import React, { useState, useEffect } from 'react';
import { Droplet, Clock, AlertCircle, CheckCircle, Info, Calendar, RefreshCw } from 'lucide-react';

const FaucetsPage = () => {
  const [userBalance, setUserBalance] = useState(150);
  const [claimableAmount, setClaimableAmount] = useState(50);
  const [cooldownHours, setCooldownHours] = useState(0);
  const [cooldownMinutes, setCooldownMinutes] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [canClaim, setCanClaim] = useState(true);
  const [dropAnimation, setDropAnimation] = useState(false);
  
  // Mock claim history data
  const [claimHistory, setClaimHistory] = useState([
    { date: 'March 10, 2025', amount: 50, status: 'success' },
    { date: 'March 9, 2025', amount: 50, status: 'success' },
    { date: 'March 8, 2025', amount: 50, status: 'success' },
    { date: 'March 7, 2025', amount: 50, status: 'failed' },
    { date: 'March 6, 2025', amount: 50, status: 'success' },
  ]);

  // Handle claim button click
  const handleClaimClick = () => {
    if (canClaim) {
      setShowModal(true);
    }
  };

  // Handle claim confirmation
  const handleConfirmClaim = () => {
    setShowModal(false);
    setUserBalance(prev => prev + claimableAmount);
    setShowSuccessMessage(true);
    setCanClaim(false);
    setCooldownHours(3);
    setCooldownMinutes(0);
    
    // Add to claim history
    const newClaim = {
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      amount: claimableAmount,
      status: 'success'
    };
    setClaimHistory([newClaim, ...claimHistory.slice(0, 4)]);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handle drop animation
  const triggerDropAnimation = () => {
    setDropAnimation(true);
    setTimeout(() => setDropAnimation(false), 1000);
  };

  // Simulate cooldown timer
  useEffect(() => {
    let timerInterval;
    if (!canClaim) {
      timerInterval = setInterval(() => {
        if (cooldownMinutes === 0) {
          if (cooldownHours === 0) {
            setCanClaim(true);
            clearInterval(timerInterval);
          } else {
            setCooldownHours(h => h - 1);
            setCooldownMinutes(59);
          }
        } else {
          setCooldownMinutes(m => m - 1);
        }
      }, 1000); // Update every second for demo purposes (would be longer in production)
    }
    return () => clearInterval(timerInterval);
  }, [cooldownHours, cooldownMinutes, canClaim]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-[var(--font-gilroy-regular)] text-[var(--color-text-primary)]">
      {/* Header */}
      <header className="bg-[var(--color-primary)] text-white py-4 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">$TOKEN Faucet</h1>
          <div className="flex items-center space-x-2">
            <span className="hidden md:inline">Your Wallet:</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">0x7f...3a2b</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto py-6 px-4 md:px-8">
        {/* Main Card */}
        <div className="bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Token Claim Section */}
          <div className="relative border-b border-[var(--color-border)] p-6 md:p-8">
            <div className="absolute right-4 top-4 md:right-8 md:top-8">
              <div 
                className={`cursor-pointer relative transform transition-transform ${dropAnimation ? 'translate-y-1' : ''}`}
                onClick={triggerDropAnimation}
              >
                <Droplet 
                  size={48} 
                  className="text-[var(--color-primary)] fill-[var(--color-primary)] opacity-70" 
                />
                <Droplet 
                  size={32} 
                  className="text-[var(--color-secondary)] fill-[var(--color-secondary)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" 
                />
              </div>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold mb-6">Get Free $TOKEN</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-secondary)]">Your Current Balance:</span>
                <span className="font-bold text-lg">{userBalance} $TOKEN</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[var(--color-text-secondary)]">Claimable Amount:</span>
                <span className="font-bold text-lg text-[var(--color-secondary)]">{claimableAmount} $TOKEN</span>
              </div>
              
              {!canClaim && (
                <div className="flex justify-between items-center">
                  <span className="text-[var(--color-text-secondary)] flex items-center gap-2">
                    <Clock size={16} /> Claim Cooldown:
                  </span>
                  <span className="font-bold text-[var(--color-muted)]">
                    You can claim again in <span className="text-[var(--color-primary)]">{cooldownHours}h {cooldownMinutes}m</span>
                  </span>
                </div>
              )}
            </div>
            
            <button
              onClick={handleClaimClick}
              disabled={!canClaim}
              className={`w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition-all ${
                canClaim 
                  ? "bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 shadow-md hover:shadow-lg" 
                  : "bg-[var(--color-muted)] cursor-not-allowed opacity-70"
              }`}
            >
              {canClaim ? `Claim ${claimableAmount} $TOKEN` : (
                <div className="flex items-center justify-center gap-2">
                  <Clock size={18} />
                  <span>Wait for Cooldown</span>
                </div>
              )}
            </button>
            
            {/* Success message */}
            {showSuccessMessage && (
              <div className="mt-4 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)] rounded-lg flex items-center gap-2 text-[var(--color-success)]">
                <CheckCircle size={20} />
                <span>You have successfully claimed {claimableAmount} $TOKEN!</span>
              </div>
            )}
          </div>
          
          {/* Faucet Rules Section */}
          <div className="p-6 md:p-8 bg-[var(--color-background)]/50">
            <div className="flex items-center gap-2 mb-4">
              <Info size={20} className="text-[var(--color-info)]" />
              <h3 className="text-lg font-bold">Faucet Rules & Info</h3>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">Why Use the Faucet?</h4>
              <p className="text-[var(--color-text-secondary)]">
                The faucet allows you to claim free $TOKENs to pay for utilities and subscriptions.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Faucet Rules:</h4>
              <ul className="text-[var(--color-text-secondary)] space-y-1 list-disc pl-5">
                <li>Users can claim once every 3 hours.</li>
                <li>Tokens are limited to 50 $TOKEN per claim cycle.</li>
                <li>Abuse or multiple claims from the same wallet may be restricted.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Recent Claims History */}
        <div className="bg-[var(--color-surface)] rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 border-b border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Claims History</h2>
              <button 
                className="text-[var(--color-primary)] flex items-center gap-1 text-sm hover:underline"
                onClick={() => {}}
              >
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-2 px-2 text-[var(--color-text-secondary)] font-medium">Date</th>
                    <th className="text-left py-2 px-2 text-[var(--color-text-secondary)] font-medium">Amount</th>
                    <th className="text-left py-2 px-2 text-[var(--color-text-secondary)] font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {claimHistory.map((claim, index) => (
                    <tr key={index} className="border-b border-[var(--color-border)]/50 last:border-0">
                      <td className="py-3 px-2 flex items-center gap-2">
                        <Calendar size={14} className="text-[var(--color-muted)]" />
                        {claim.date}
                      </td>
                      <td className="py-3 px-2 font-medium">{claim.amount} $TOKEN</td>
                      <td className="py-3 px-2">
                        {claim.status === 'success' ? (
                          <span className="text-[var(--color-success)] flex items-center gap-1">
                            <CheckCircle size={16} />
                            Success
                          </span>
                        ) : (
                          <span className="text-[var(--color-error)] flex items-center gap-1">
                            <AlertCircle size={16} />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[var(--color-overlay)] flex items-center justify-center z-50 px-4">
          <div className="bg-[var(--color-surface)] rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Confirm Claim</h3>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Are you sure you want to claim {claimableAmount} $TOKEN?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 px-4 border border-[var(--color-border)] rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmClaim}
                className="flex-1 py-3 px-4 bg-[var(--color-primary)] text-white rounded-lg font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaucetsPage;
