type ModalItemProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };
  
  export function Modal({ open, onClose, children }: ModalItemProps) {
    return (
      <div
        onClick={onClose}
        className={`fixed inset-0 flex justify-center items-center
    ${
      open ? "visible bg-black/20" : "invisible"
    } aspect-w-3 aspect-h-2 sm:aspect-w-1 sm:aspect-h-1 lg:aspect-h-4`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white rounded-xl shadow p-6 ${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-md text-gray-400 bg-white hover:text-gray-600"
          >
            X
          </button>
          {children}
        </div>
      </div>
    );
  }
  