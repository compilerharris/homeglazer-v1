import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PDFGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (clientName: string, email: string, phone: string) => void;
  isGenerating: boolean;
}

const PDFGenerationModal: React.FC<PDFGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating
}) => {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim() && email.trim() && phone.trim()) {
      onGenerate(clientName.trim(), email.trim(), phone.trim());
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      setClientName('');
      setEmail('');
      setPhone('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Send Summary</h2>
          <button
            onClick={handleClose}
            disabled={isGenerating}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            Please provide your details to receive the colour visualization summary via email:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter your name"
                required
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#299dd7] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#299dd7] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#299dd7] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                disabled={isGenerating}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!clientName.trim() || !email.trim() || !phone.trim() || isGenerating}
                className="flex-1 px-4 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#1e7bb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  'Send me Summary'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PDFGenerationModal;
