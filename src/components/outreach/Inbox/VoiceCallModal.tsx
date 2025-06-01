import React, { useState } from 'react';
import { X, Phone, Mic, MicOff } from 'lucide-react';

interface VoiceCallModalProps {
  creator: {
    name: string;
  };
  onClose: () => void;
}

const VoiceCallModal: React.FC<VoiceCallModalProps> = ({ creator, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">AI Voice Call</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 text-center">
          <h4 className="text-xl font-semibold text-slate-800">{creator.name}</h4>
          <p className="mt-1 text-sm text-slate-500">
            {isConnecting ? 'Connecting...' : 'Connected'}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-slate-200'
            }`}
          >
            {isMuted ? (
              <MicOff size={20} className="text-white" />
            ) : (
              <Mic size={20} className="text-slate-700" />
            )}
          </button>
          <button
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500"
          >
            <Phone size={20} className="text-white" />
          </button>
        </div>

        <div className="mt-6">
          <div className="rounded-lg bg-primary-50 p-4">
            <h5 className="mb-2 font-medium text-primary-900">AI Voice Assistant Features:</h5>
            <ul className="space-y-2 text-sm text-primary-700">
              <li>• Negotiate campaign terms and pricing</li>
              <li>• Schedule content deadlines and deliverables</li>
              <li>• Discuss collaboration requirements</li>
              <li>• Handle contract terms and usage rights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCallModal;