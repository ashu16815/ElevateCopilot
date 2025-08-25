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
      // Store the referral code
      setReferralCode(ref.trim());
      
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000); // 1 second delay
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return {
    referralCode,
    showPopup,
    closePopup
  };
}
