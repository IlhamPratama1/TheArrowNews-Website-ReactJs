import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ sidebarStatus }) {
  const { pathname } = useLocation();

  useEffect(() => {
    sidebarStatus(false);
    window.scrollTo(0, 0);
  }, [pathname, sidebarStatus]);

  return null;
}