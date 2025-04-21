import { useBlocker } from "react-router-dom";
import { useEffect } from "react";

export function usePrompt(when, blockerHandler) {
  const blocker = useBlocker(when);

  useEffect(() => {
    if (blocker.state === "blocked") {
      blockerHandler(blocker);
    }
  }, [blocker, blocker.state, blockerHandler]);
}
