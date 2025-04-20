// useConfirmNavigation.js
import { useEffect, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { useContext } from "react";

export const useConfirmNavigation = (when, onConfirm) => {
  const navigator = useContext(NavigationContext).navigator;
  const [nextLocation, setNextLocation] = useState(null);

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    navigator.push = (...args) => {
      const [path] = args;
      setNextLocation(() => () => push(path));
    };

    navigator.replace = (...args) => {
      const [path] = args;
      setNextLocation(() => () => replace(path));
    };

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [navigator, when]);

  useEffect(() => {
    if (nextLocation) {
      onConfirm(nextLocation);
    }
  }, [nextLocation, onConfirm]);
};
