import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

interface VoiceCommandModalProps {
  onClose: () => void;
}

const VoiceCommandModal: React.FC<VoiceCommandModalProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    // Simulated voice recognition
    setTimeout(() => {
      setTranscript('Schedule a meeting with the design team tomorrow at 2 PM');
      setIsListening(false);
    }, 2000);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Voice Command</h3>
          <p className="text-gray-600">Speak your command</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={startListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isListening ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
            }`}
          >
            {isListening ? (
              <Loader className="w-8 h-8 animate-spin" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          <div className="w-full min-h-[60px] bg-gray-50 rounded-lg p-3 text-center">
            {transcript || 'Listening...'}
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            disabled={!transcript}
          >
            Execute Command
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandModal;