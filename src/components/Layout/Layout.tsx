import React, { ReactNode, useState } from "react";
import Nav from "../Nav-bar/Nav";
import SideDrawer from "../SideDrawer/SideDrawer";

type Props = {
  children: ReactNode;
};
const Layout = ({ children }: Props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  return (
    <>
      <Nav show={showSideDrawer} showHandler={setShowSideDrawer} />
      <SideDrawer show={showSideDrawer} showHandler={setShowSideDrawer} />
      {children}
    </>
  );
};

export default Layout;
