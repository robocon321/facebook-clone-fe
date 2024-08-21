import React from "react";

import { AccountWithManualFriendResponse } from "types/responses/RecommendAccountResponse";
import Button from "../buttons/Button";
import Link from "next/link";
import Image from "next/image";

type FriendCardTypeProps = {
  account: AccountWithManualFriendResponse;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

const FriendCardHorizal: React.FC<FriendCardTypeProps> = (props) => {
  const { account, onDelete } = props;

  return (
    <li>
      <Link
        className="flex items-center hover:bg-gray-200 p-2 rounded"
        href={`?profile_id=${account.accountId}`}
      >
        <div className="w-12 h-12 my-2">
          <Image
            layout="fill"
            className="w-full h-full rounded-full"
            src={account.profilePictureUrl}
            alt="Not found"
          />
        </div>
        <div className="flex-grow ml-2">
          <div className="my-2 flex items-center justify-between">
            <h3 className="font-bold max-w-[150px]">
              {account.lastName + " " + account.firstName}
            </h3>
            <p className="text-sm">20 weeks</p>
          </div>
          <div className="flex m-1">
            {account.manualFriends && account.manualFriends.length > 0 && (
              <div className="flex items-center">
                {account.manualFriends.slice(0, 3).map((item, index) => (
                  <div
                    key={item.accountId}
                    className={"w-5 h-5" + (index > 0 ? " ml-[-10px]" : "")}
                  >
                    <Image
                      layout="fill"
                      className="w-full h-full rounded-full border-white border"
                      src={item.profilePictureUrl}
                      alt="Not found"
                    />
                  </div>
                ))}
                {account.manualFriends.length >= 3 && (
                  <div className="w-5 h-5 flex justify-center items-center ml-[-10px] bg-gray-500 text-white text-sm rounded-full border-white border">
                    +{account.manualFriends.length - 3}
                  </div>
                )}
                <div className="px-1 ml-1">
                  {account.manualFriends.length} manual friends
                </div>
              </div>
            )}
          </div>
          <div className="flex">
            <div className="px-2 mb-2 w-full">
              <Button
                onClick={(e) => onDelete(e, account.accountId)}
                type="button"
                size="large"
                block="true"
                fontSize="text-md"
                fontWeight="font-medium"
                bg="bg-gray-300"
                color="text-black"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default FriendCardHorizal;
