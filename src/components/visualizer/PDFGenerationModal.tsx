import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PDFGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (clientName: string, dateOfDesign: string) => void;
  isGenerating: boolean;
}

const PDFGenerationModal: React.FC<PDFGenerationModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  isGenerating
}) => {
  const [clientName, setClientName] = useState('');
  const [dateOfDesign, setDateOfDesign] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientName.trim()) {
      onGenerate(clientName.trim(), dateOfDesign);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      setClientName('');
      setDateOfDesign(new Date().toISOString().split('T')[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Generate PDF</h2>
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
            Please provide the following information to generate your personalized PDF:
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Client Name */}
            <div>
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
                required
                disabled={isGenerating}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#299dd7] focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>

            {/* Date of Design */}
            <div>
              <label htmlFor="dateOfDesign" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Design
              </label>
              <input
                type="date"
                id="dateOfDesign"
                value={dateOfDesign}
                onChange={(e) => setDateOfDesign(e.target.value)}
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
                disabled={!clientName.trim() || isGenerating}
                className="flex-1 px-4 py-3 bg-[#299dd7] text-white rounded-lg hover:bg-[#1e7bb8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </>
                ) : (
                  'Generate PDF'
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
