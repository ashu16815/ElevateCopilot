'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function useReferralDetector() {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check for referral code in URL
    const ref = searchParams.get('ref');
    
    if (ref && ref.trim() !== '') {
      // Check if popup has already been shown for this referral code in this session
      const shownReferrals = JSON.parse(sessionStorage.getItem('shownReferrals') || '[]');
      const hasShownThisReferral = shownReferrals.includes(ref.trim());
      
      if (!hasShownThisReferral) {
        // Store the referral code
        setReferralCode(ref.trim());
        
        // Show popup after a short delay for better UX
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 1000); // 1 second delay
        
        return () => clearTimeout(timer);
      }
    }
  }, [searchParams]);

  const closePopup = () => {
    setShowPopup(false);
    
    // Mark this referral code as shown in this session
    if (referralCode) {
      const shownReferrals = JSON.parse(sessionStorage.getItem('shownReferrals') || '[]');
      if (!shownReferrals.includes(referralCode)) {
        shownReferrals.push(referralCode);
        sessionStorage.setItem('shownReferrals', JSON.stringify(shownReferrals));
      }
    }
  };

  return {
    referralCode,
    showPopup,
    closePopup
  };
}
