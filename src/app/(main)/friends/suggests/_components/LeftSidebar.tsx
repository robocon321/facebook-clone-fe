"use client"

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FriendCardHorizal from 'components/limb/card/FriendCardHorizal';
import Link from 'next/link';
import React, { useContext } from 'react';
import { RelationshipContext } from '../../_providers/RelationshipProvider';
import { RelationshipContextType } from '../../_type/RelationshipType';

const LeftSidebar: React.FC = () => {
    const { recommendRequestFriendship } = useContext(RelationshipContext) as RelationshipContextType;
    return (
        <div className="p-2 w-full bg-white">
            <div className="flex items-center">
                <Link className="text-md" href="/friends">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div className="ml-4">
                    <Link className="hover:underline" href="/friends">Friends</Link>
                    <h2 className="font-bold text-xl">Maybe you know</h2>
                </div>
            </div>
            <hr className="my-4" />
            <ul>
                {
                    recommendRequestFriendship.data.map(item => <FriendCardHorizal key={item.accountId} submitText='Add Friend' cancelText='Delete' account={item} onSubmit={() => { }} onCancel={() => { }} />)
                }
            </ul>
        </div>
    );
};

export default LeftSidebar;
