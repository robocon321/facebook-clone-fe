"use client"

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useContext } from 'react';
import { RelationshipContext } from '../../_providers/RelationshipProvider';
import { RelationshipContextType } from '../../_type/RelationshipType';
import FriendCardHorizal from 'components/limb/card/FriendCardHorizal';

const LeftSidebar: React.FC = () => {
    const { receiveRequestFriendship } = useContext(RelationshipContext) as RelationshipContextType;
    return (
        <div className="p-2 w-full h-auto overflow-y-auto bg-white" style={{
            height: "calc(100% - 16rem)"
        }}>
            <div className="flex items-center">
                <Link className="text-md" href="/friends">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <div className="ml-4">
                    <Link className="hover:underline" href="/friends">Friends</Link>
                    <h2 className="font-bold text-xl">Request to make friends</h2>
                </div>
            </div>
            <hr className="my-4" />
            <h3 className="font-bold">{receiveRequestFriendship.data.length} requests to make friends</h3>
            <Link className="mb-4 text-blue-600 text-sm hover:underline" href="#">Show your request you sent</Link>
            <ul>
                {
                    receiveRequestFriendship.data.map(item => <FriendCardHorizal key={item.accountId} submitText='Confirm' cancelText='Delete' account={item} onSubmit={() => { }} onCancel={() => { }} />)
                }
            </ul>
        </div>
    );
};

export default LeftSidebar;
