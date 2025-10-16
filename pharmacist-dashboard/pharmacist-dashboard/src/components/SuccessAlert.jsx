import { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const SuccessAlert = ({ message, isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 min-w-80 max-w-md">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="text-green-500" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Success!
            </h3>
            <p className="text-sm text-gray-600">
              {message}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SuccessAlert;