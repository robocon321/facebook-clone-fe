import React from "react";
import MainContentContainer from "../common";
import Navbar from "../limb/navbar";

interface IProps {
  children?: React.ReactNode;
}

const MarketplacePageLayout: React.FC<IProps> = (props) => {
  const { children } = props;
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
};

export default MarketplacePageLayout;
