"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useContext } from "react";
import { RelationshipContext } from "../../_providers/RelationshipProvider";
import { RelationshipContextType } from "../../_type/RelationshipType";
import AddFriendCardHorizal from "components/limb/card/AddFriendCardHorizal";
import { FriendshipRequest } from "types/requests/FriendshipRequest";
import { changeFriendship } from "services/FriendshipService";

const LeftSidebar: React.FC = () => {
  const { recommendRequestFriendship, setRecommendRequestFriendship } =
    useContext(RelationshipContext) as RelationshipContextType;

  const onAddFriend = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const request: FriendshipRequest = {
      receiverId: id,
      status: "PENDING",
    };
    changeFriendship(request)
      .then((response) => {
        setRecommendRequestFriendship({
          ...recommendRequestFriendship,
          data: recommendRequestFriendship.data.filter(
            (item) => item.accountId != id
          ),
        });
      })
      .catch((error) => console.log(error));
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setRecommendRequestFriendship({
      ...recommendRequestFriendship,
      data: recommendRequestFriendship.data.filter(
        (item) => item.accountId != id
      ),
    });
  };

  return (
    <div className="p-2 w-full bg-white">
      <div className="flex items-center">
        <Link className="text-md" href="/friends">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className="ml-4">
          <Link className="hover:underline" href="/friends">
            Friends
          </Link>
          <h2 className="font-bold text-xl">Maybe you know</h2>
        </div>
      </div>
      <hr className="my-4" />
      <ul>
        {recommendRequestFriendship.data.map((item) => (
          <AddFriendCardHorizal
            key={item.accountId}
            onAddFriend={onAddFriend}
            onDelete={onDelete}
            account={item}
          />
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
