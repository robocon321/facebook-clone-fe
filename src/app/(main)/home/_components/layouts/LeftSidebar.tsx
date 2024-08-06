"use client";

import Link from "next/link";
import { AppContext } from "app/_providers/AppProvider";
import React, { useContext } from "react";
import { AppContextType } from "app/_type/AppType";
import Image from "next/image";

const LeftSidebar: React.FC = () => {
  const { appState } = useContext(AppContext) as AppContextType;

  return (
    <div className="w-9/12 h-auto py-3">
      <ul className="w-full text-gray-600">
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <Image
              className="w-8 h-8 rounded-full"
              src="https://random.imagecdn.app/200/200"
              alt="user"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {appState.data.user?.lastName} {appState.data.user?.firstName}
            </p>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <Image
              className="w-8 h-8 rounded-full"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/tInzwsw2pVX.png"
              alt="info"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Covid-19 Information Center</p>
          </div>
        </li>
        <li className="h-12 mb-2 cursor-pointer flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200">
          <Link
            href={"/friends"}
            className="flex items-center justify-content w-full h-full"
          >
            <div>
              <i
                data-visualcompletion="css-Image"
                style={{
                  backgroundImage: "url('/navbar-icon.png')",
                  backgroundPosition: "0 -296px",
                  backgroundSize: "auto",
                  width: "36px",
                  height: "36px",
                  backgroundRepeat: "no-repeat",
                  display: "inline-block",
                }}
              ></i>
            </div>
            <div>
              <p className="text-sm font-semibold ml-2">Friends</p>
            </div>
          </Link>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <i
              data-visualcompletion="css-Image"
              style={{
                backgroundImage: "url('/navbar-icon.png')",
                backgroundPosition: "0 -444px",
                backgroundSize: "auto",
                width: "36px",
                height: "36px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            ></i>
          </div>
          <div>
            <p className="text-sm font-semibold">Memories</p>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <i
              data-visualcompletion="css-Image"
              style={{
                backgroundImage: "url('/navbar-icon.png')",
                backgroundPosition: "0 -111px",
                backgroundSize: "auto",
                width: "36px",
                height: "36px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            ></i>
          </div>
          <div>
            <p className="text-sm font-semibold">Pages</p>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <i
              data-visualcompletion="css-Image"
              style={{
                backgroundImage: "url('/navbar-icon.png')",
                backgroundPosition: "0 -37px",
                backgroundSize: "auto",
                width: "36px",
                height: "36px",
                backgroundRepeat: "no-repeat",
                display: "inline-block",
              }}
            ></i>
          </div>
          <div>
            <p className="text-sm font-semibold">Groups</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeftSidebar;
