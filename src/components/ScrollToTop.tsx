import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop: FC<React.PropsWithChildren> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    console.log("🚀 ~ pathname:", location)
  }, [location.pathname,location.search]);

  return <div>{children}</div>;
};

export default ScrollToTop;
