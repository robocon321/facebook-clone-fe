"use client";

import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import Profile from "../../../../components/limb/profile/Profile";
import LeftSidebar from "./_components/LeftSidebar";
import { RequestsContext } from "./_providers/RequestsProvider";
import { RequestsContextType } from "./_type/RequestsType";

const FriendPage: React.FC = () => {
  const { profile } = useContext(RequestsContext) as RequestsContextType;
  const searchParams = useSearchParams();
  const search = searchParams.get("profile_id");

  return (
    <>
      <div className="col-span-3 h-full overflow-y-auto flex justify-start bg-white shadow-md custom-scroll">
        <LeftSidebar />
      </div>
      <div className="col-span-9 h-full flex justify-center items-center">
        {search ? (
          <Profile profile={profile} />
        ) : (
          <div>
            <div className="flex justify-center w-full">
              <img className="w-32" src="/detail-friend.svg" alt="Not found" />
            </div>
            <h3 className="font-bold text-gray-600">
              Select the name of the person whose profile you want to preview.
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default FriendPage;
