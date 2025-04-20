import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useCart } from "../context/cartContext";

Modal.setAppElement("#root"); // must be set once in the app

const DiscardCartComponent = ({ cart, setCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const{setCart} = useCart();

  const handleBackClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setCart([]); // clear cart state
    localStorage.setItem('cart',JSON.stringify([]));
    localStorage.removeItem("cart"); // clear local storage
    setIsModalOpen(false);
    navigate("/home"); // or any route
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleBackClick}
        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
      >
        Back
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        contentLabel="Confirm Navigation"
        className="bg-white p-8 rounded-lg shadow-lg w-[400px] mx-auto mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-semibold mb-4">Discard Cart?</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to go back? Your cart will be discarded.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Yes, Discard
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DiscardCartComponent;
