'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Gift, ArrowRight, CheckCircle } from 'lucide-react';

interface ReferralPopupProps {
  referralCode: string;
  onClose: () => void;
}

export default function ReferralPopup({ referralCode, onClose }: ReferralPopupProps) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate in after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetDiscount = () => {
    // Clear the referral parameter from URL to prevent re-triggering
    const url = new URL(window.location.href);
    url.searchParams.delete('ref');
    window.history.replaceState({}, '', url.toString());
    
    // Redirect to contact page with referral code pre-filled
    router.push(`/contact?ref=${referralCode}`);
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${
        isVisible ? 'scale-100' : 'scale-95'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Success icon */}
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Congratulations!
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-4">
            You've been referred to ElevateCopilot and are eligible for a{' '}
            <span className="font-semibold text-green-600">10% discount</span> on all courses!
          </p>

          {/* Referral code display */}
          <div className="bg-gray-50 rounded-lg p-3 mb-6">
            <p className="text-sm text-gray-600 mb-1">Your referral code:</p>
            <div className="font-mono text-lg font-bold text-primary bg-white px-3 py-2 rounded border-2 border-green-300">
              {referralCode}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
              <Gift className="h-4 w-4 mr-2" />
              What you get:
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>10% off</strong> any Microsoft Copilot course</li>
              <li>• Practical, hands-on AI training</li>
              <li>• Professional certification</li>
              <li>• LinkedIn-shareable badge</li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetDiscount}
            className="w-full bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            Get Your 10% Discount
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>

          {/* Note */}
          <p className="text-xs text-gray-500 mt-3">
            This discount will be automatically applied when you contact us
          </p>
        </div>
      </div>
    </div>
  );
}
