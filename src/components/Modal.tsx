import { type FC } from "react";

type ModalItemProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: FC<ModalItemProps> = ({
  open,
  onClose,
  children,
}: ModalItemProps) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex items-center justify-center sm:p-4 ${
        open ? "visible" : "invisible"
      } z-50 bg-black/20`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        style={{ width: "650px", height: "550px" }} // Adjust the size as desired
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md bg-white p-1 text-gray-400 hover:text-gray-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
