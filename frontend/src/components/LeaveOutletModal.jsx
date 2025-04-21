import React from "react";
import Modal from "react-modal";

Modal.setAppElement(document.body);

const LeaveOutletModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Leave Confirmation"
      style={{
        content: {
          width: "300px",
          margin: "auto",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <h2>Leave this outlet?</h2>
      <p>Your cart will be discarded.</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={onConfirm} style={{ padding: "8px 16px" }}>Yes</button>
        <button onClick={onCancel} style={{ padding: "8px 16px" }}>No</button>
      </div>
    </Modal>
  );
};

export default LeaveOutletModal;
