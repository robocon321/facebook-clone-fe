"use client"

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendCardHorizal from 'components/limb/card/FriendCardHorizal';
import Link from 'next/link';
import React, { useContext } from 'react';
import { changeFriendship } from 'services/FriendshipService';
import { FriendshipRequest } from 'types/requests/FriendshipRequest';
import { ListFriendContext } from '../_providers/ListFriendProvider';
import { ListFriendContextType } from '../_type/ListFriendType';

const LeftSidebar: React.FC = () => {
    const { friendData, setFriendData } = useContext(ListFriendContext) as ListFriendContextType;

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
        e.stopPropagation();
        const request: FriendshipRequest = {
            receiverId: id,
            status: 'CANCEL'
        };
        changeFriendship(request)
            .then(response => {
                setFriendData({
                    ...friendData,
                    data: friendData.data.filter(item => item.accountId != id)
                });
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="p-2 w-full bg-white">
            <div className="flex items-center">
                <Link className="text-md" href="/friends">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div className="ml-4">
                    <Link className="hover:underline" href="/friends">Friends</Link>
                    <h2 className="font-bold text-xl">Your friends</h2>
                </div>
            </div>
            <hr className="my-4" />
            <ul>
                {
                    friendData.data.map(item => <FriendCardHorizal key={item.accountId} onDelete={onDelete} account={item} />)
                }
            </ul>
        </div>
    );
};

export default LeftSidebar;
