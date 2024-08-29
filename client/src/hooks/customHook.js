import { useEffect } from "react";

export function usePopupWithTimeout(
  condition,
  showPopup,
  hidePopup,
  dispatchAction,
  timeout = 1000
) {
  useEffect(() => {
    if (condition === true) {
      showPopup(true);
      const popupTimeout = setTimeout(() => {
        hidePopup(false);
        dispatchAction();
      }, timeout);

      return () => {
        clearTimeout(popupTimeout);
      };
    }
  }, [condition, showPopup, hidePopup, dispatchAction, timeout]);
}

