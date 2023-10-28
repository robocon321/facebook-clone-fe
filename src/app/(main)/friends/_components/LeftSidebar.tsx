"use client"

import { faCakeCandles, faChevronRight, faEnvelope, faGear, faPeopleGroup, faPlus, faSliders, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const LeftSidebar: React.FC = () => {
    return (
        <div className="p-2 h-auto w-full bg-white overflow-scroll" style={{
            
        }}>
            <div className="flex justify-between items-center mb-2">
                <h1 className='font-bold text-3xl'>Friends</h1>
                <div className="flex items-center justify-center bg-gray-200 w-10 h-10 rounded-full">
                    <FontAwesomeIcon icon={faGear} />
                </div>
            </div>
            <ul className="w-full">
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md bg-gray-200">
                    <Link className="flex items-center text-2xl w-full" href="#">
                        <div className="flex items-center py-2">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-blue-600 text-white">
                                <FontAwesomeIcon icon={faUserGroup} />
                            </div>
                            <div className="text-sm font-normal">Home</div>
                        </div>
                    </Link>
                </li>
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <Link className="w-full text-2xl w-full flex items-center justify-between" href="/friends/requests">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-gray-100">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="text-sm font-normal">Request to make friends</div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </li>
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <Link className="w-full text-2xl w-full flex items-center justify-between" href="/friends/suggests">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-gray-100">
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                            <div className="text-sm font-normal">Suggest</div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </li>
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <Link className="w-full text-2xl w-full flex items-center justify-between" href="/friends/list">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-gray-100">
                                <FontAwesomeIcon icon={faPeopleGroup} />
                            </div>
                            <div className="text-sm font-normal">All friends</div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </li>
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <Link className="w-full text-2xl w-full flex items-center" href="#">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-gray-100">
                                <FontAwesomeIcon icon={faCakeCandles} />
                            </div>
                            <div className="text-sm font-normal">Birthdate</div>
                        </div>
                    </Link>
                </li>
                <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
                    <Link className="w-full text-2xl w-full flex items-center justify-between" href="#">
                        <div className="flex items-center">
                            <div className="flex justify-center items-center mr-4 w-12 h-12 rounded-full bg-gray-100">
                                <FontAwesomeIcon icon={faSliders} />
                            </div>
                            <div className="text-sm font-normal">Custom list</div>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default LeftSidebar;
