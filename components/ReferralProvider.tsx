'use client'

import { useReferralDetector } from '@/hooks/useReferralDetector';
import ReferralPopup from './ReferralPopup';

export default function ReferralProvider() {
  const { referralCode, showPopup, closePopup } = useReferralDetector();

  if (!showPopup || !referralCode) {
    return null;
  }

  return (
    <ReferralPopup 
      referralCode={referralCode} 
      onClose={closePopup} 
    />
  );
}
