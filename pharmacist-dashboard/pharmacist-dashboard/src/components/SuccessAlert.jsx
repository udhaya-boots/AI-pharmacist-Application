import { useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

const SuccessAlert = ({ message, isVisible, onClose, duration = 3000, type }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;
  const typeStyles = {
    success: {
      icon: <CheckCircle className="text-green-600" size={24} />,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800"
    },
    info: {
      icon: <Info className="text-blue-600" size={24} />,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800"
    },
    warning: {
      icon: <AlertTriangle className="text-yellow-600" size={24} />,
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800"
    },
    error: {
      icon: <XCircle className="text-red-600" size={24} />,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800"
    }
  };

  const { icon, bg, border, text } = typeStyles[type] || typeStyles.success;
  return (
    <div className={`fixed top-6 right-6 z-50 flex items-center space-x-3 ${bg} ${border} ${text} border px-5 py-3 rounded-lg shadow-lg transition-all duration-300`}>

      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {/* <CheckCircle className="text-green-500" size={24} />
             */}
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {type}
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
  );
};
export default SuccessAlert;