"use client"

import AddFriendCardVertical from "components/limb/card/AddFriendCardVertical";
import ConfirmFriendCardVertical from "components/limb/card/ConfirmFriendCardVertical";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { getRecommendAccountFriendship } from "services/AccountService";
import LeftSidebar from "./_components/LeftSidebar";
import { RelationshipContext } from "./_providers/RelationshipProvider";
import { RelationshipContextType } from "./_type/RelationshipType";
import { FriendshipRequest } from "types/requests/FriendshipRequest";
import { changeFriendship } from "services/FriendshipService";

const FriendPage: React.FC = () => {
  const {
    isLoading,
    setIsLoading,
    receiveRequestFriendship,
    setReceiveRequestFriendship,
    recommendRequestFriendship,
    setRecommendRequestFriendship
  } = useContext(RelationshipContext) as RelationshipContextType;


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (windowHeight + scrollY == documentHeight) {
        getRecommendAccountFriendship('', [], {
          page: recommendRequestFriendship.page + 1,
          size: recommendRequestFriendship.size,
          sortBy: [],
          sortOrder: []
        })
          .then(response => {
            setRecommendRequestFriendship({
              size: 10,
              page: recommendRequestFriendship.page + 1,
              data: [...recommendRequestFriendship.data,...response.data]
            });
            setIsLoading(false);
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          })
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [recommendRequestFriendship]);

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const request: FriendshipRequest = {
      receiverId: id,
      status: 'ACCEPTED'
    };
    changeFriendship(request)
    .then(response => {
      setReceiveRequestFriendship({
        ...receiveRequestFriendship,
        data: receiveRequestFriendship.data.filter(item => item.accountId != id)
      });  
    })
    .catch(error => console.log(error));
  };

  const onAddFriend = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const request: FriendshipRequest = {
      receiverId: id,
      status: 'PENDING'
    };
    changeFriendship(request)
    .then(response => {
      setRecommendRequestFriendship({
        ...recommendRequestFriendship,
        data: recommendRequestFriendship.data.filter(item => item.accountId != id)
      });
    })
    .catch(error => console.log(error));
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setRecommendRequestFriendship({
      ...recommendRequestFriendship,
      data: recommendRequestFriendship.data.filter(item => item.accountId != id)
    })
  };

  const onReject = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    const request: FriendshipRequest = {
      receiverId: id,
      status: 'REJECTED'
    };
    changeFriendship(request)
    .then(response => {
      setReceiveRequestFriendship({
        ...receiveRequestFriendship,
        data: receiveRequestFriendship.data.filter(item => item.accountId != id)
      });      
    })
    .catch(error => console.log(error));
  };

  return (
    <>
      <div className="col-span-3 flex justify-start bg-white shadow-md">
        <LeftSidebar />
      </div>
      <div className="col-span-9 h-full">
        <div className="p-4">
          <div className="mb-2">
            <div className="mb-2 flex justify-between items-center">
              <h3 className="font-bold text-xl">Request to make friends</h3>
              <Link className="text-blue-600" href="/friends/requests">Show all</Link>
            </div>
            <div className="py-4 grid grid-cols-6 gap-2">
              {
                receiveRequestFriendship.data.map(item => <ConfirmFriendCardVertical key={item.accountId} account={item} onConfirm={onConfirm} onReject={onReject} />)
              }
            </div>
            <hr className="my-4 border-gray-400" />
            <div className="mb-2 flex justify-between items-center">
              <h3 className="font-bold text-xl">Maybe you know them</h3>
              <Link className="text-blue-600" href="/friends/suggests">Show all</Link>
            </div>
            <div className="py-4 grid grid-cols-6 gap-2">
              {
                recommendRequestFriendship.data.map(item => <AddFriendCardVertical key={item.accountId} account={item} onAddFriend={onAddFriend} onDelete={onDelete} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendPage;
