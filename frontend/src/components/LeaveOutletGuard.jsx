import React from "react";
import { useNavigationPrompt } from "../hooks/useNavigationPrompt";
import LeaveOutletModal from "./LeaveOutletModal";

const LeaveOutletGuard = () => {
  const { showPrompt, confirmLeave, cancelLeave } = useNavigationPrompt();

  return (
    <LeaveOutletModal
      isOpen={showPrompt}
      onConfirm={confirmLeave}
      onCancel={cancelLeave}
    />
  );
};

export default LeaveOutletGuard;
