"use client";

import { useSearchParams } from "next/navigation";
import LeftSidebar from "./_components/LeftSidebar";
import Profile from "../../../../components/limb/profile/Profile";
import { useContext, useEffect, useRef } from "react";
import { ListFriendContext } from "./_providers/ListFriendProvider";
import { ListFriendContextType } from "./_type/ListFriendType";
import { getAccountFriendshipAndStatus, getRecommendAccountFriendship } from "services/AccountService";

const SuggestsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const search = searchParams.get('profile_id');

    const { profile, setIsLoading, friendData, setFriendData } = useContext(ListFriendContext) as ListFriendContextType;
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = scrollRef.current;

        const handleScroll = () => {
            if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container;
                if (scrollTop + clientHeight >= scrollHeight - 20) {
                    getAccountFriendshipAndStatus('ACCEPTED', '', [], {
                        page: friendData.page + 1,
                        size: friendData.size,
                        sortBy: [],
                        sortOrder: []
                    })
                        .then(response => {
                            setFriendData({
                                size: 10,
                                page: friendData.page + 1,
                                data: [...friendData.data, ...response.data]
                            });
                            setIsLoading(false);
                        })
                        .catch(error => {
                            console.log(error);
                            setIsLoading(false);
                        })
                }
            }
        };

        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        };
    }, [friendData]);
    return (
        <>
            <div ref={scrollRef} className="col-span-3 h-full overflow-y-auto flex justify-start bg-white shadow-md custom-scroll">
                <LeftSidebar />
            </div>
            <div className="col-span-9 h-full flex justify-center items-center">
                {
                    search ? (
                        <Profile profile={profile} />
                    ) : (
                        <div>
                            <div className="flex justify-center w-full">
                                <img className="w-32" src="/detail-friend.svg" alt="Not found" />
                            </div>
                            <h3 className="font-bold text-gray-600">Select the name of the person whose profile you want to preview.</h3>
                        </div>

                    )
                }
            </div>
        </>
    );
};

export default SuggestsPage;
