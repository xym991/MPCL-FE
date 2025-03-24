import React, { useEffect } from "react";
import { tabs } from "../../utils/managementTabs";
import cn from "../../utils/cn";
import "./index.css";
const Header = ({ tab, setTab }) => {
  useEffect(() => {
    if (!tab) setTab(tabs[0]);
  }, []);

  return (
    <div className="_management-header flex w-full justify-between bg-white rounded-md overflow-hidden">
      {tabs.map((t) => (
        <div
          className={cn(
            "tab flex-1 flex items-center p-4 justify-center font-semibold capitalize cursor-pointer transition-all",
            tab == t ? "active" : ""
          )}
          onClick={() => setTab(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
};

export default Header;
