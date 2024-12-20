import { AppContext } from "app/_providers/AppProvider";
import { AppContextType } from "app/_type/AppType";
import moment from "moment";
import React, { useContext } from "react";

const RightSidebar: React.FC = () => {
  const { accountHistories } = useContext(AppContext) as AppContextType;

  return (
    <div className="w-9/12 h-auto py-3 pr-2">
      <div className="w-full text-gray-600 border-b-2 pb-2 mb-2 border-gray-300">
        <p className="font-semibold mb-2">Your Pages</p>
        <li className="h-12 mb-2 flex items-center -ml-3 justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <img
              className="w-8 h-8 rounded-full"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/tInzwsw2pVX.png"
              alt="user"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Littlebit Programmer</p>
          </div>
        </li>
        <ul className="text-gray-500 text-sm">
          <li className="h-8 mb-2 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <i className="fas fa-bell"></i>
            </div>
            <div>
              <p className="text-xs">Notification</p>
            </div>
          </li>
          <li className="h-8 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <i className="fas fa-bullhorn"></i>
            </div>
            <div>
              <p className="text-xs">Create promotion</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-600">
          <div>
            <p className="text-sm font-semibold">Contacts</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fab fa-youtube"></i>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fas fa-search"></i>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        <div className="-ml-2">
          <ul className="w-full text-gray-600">
            {accountHistories.map((item) => (
              <li
                key={item.account.accountId}
                className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200"
              >
                <div>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={item.account.profilePictureUrl}
                    alt="Not found"
                  />
                </div>
                <div className="flex justify-between items-center flex-grow">
                  <p className="text-sm font-semibold">
                    {item.account.lastName + " " + item.account.firstName}
                  </p>
                  {item.currentHistory &&
                    (item.currentHistory.status == "ONLINE" ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="text-sm text-green-500 text-green-500 rounded-full">
                        {moment(item.currentHistory.actionTime).fromNow()}
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
