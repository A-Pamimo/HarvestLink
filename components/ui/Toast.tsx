'use client';

// Simple toast notification component

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ 
  message, 
  type = 'info', 
  show, 
  onClose, 
  duration = 3000 
}: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`px-6 py-3 rounded-lg shadow-lg ${typeClasses[type]} max-w-sm`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast hook for easier usage
export function useToast() {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info',
  });

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, show: false }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
}
