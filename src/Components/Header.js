import * as React from "react";
import LogoSVG from "../Assets/svg/Logo.svg";

export const Header = () => {
  return (
    <div className="font-Inter font-bold text-3xl bg-wires-main text-wires-title">
      <div className="flex items-center py-4 px-4">
        <img src={LogoSVG} />
        Wires
      </div>
    </div>
  );
};
export default Header;
