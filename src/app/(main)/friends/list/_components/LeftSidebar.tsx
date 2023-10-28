"use client"

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendCardHorizal from 'components/limb/card/FriendCardHorizal';
import Link from 'next/link';
import React, { useContext } from 'react';
import { ListFriendContext } from '../_providers/ListFriendProvider';
import { ListFriendContextType } from '../_type/ListFriendType';

const LeftSidebar: React.FC = () => {
    const { friendData } = useContext(ListFriendContext) as ListFriendContextType;
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
                    friendData.data.map(item => <FriendCardHorizal key={item.accountId} account={item} />)
                }
            </ul>
        </div>
    );
};

export default LeftSidebar;
