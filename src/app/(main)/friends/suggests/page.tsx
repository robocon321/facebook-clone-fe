"use client";

import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
import { getRecommendAccountFriendship } from "services/AccountService";
import Profile from "../../../../components/limb/profile/Profile";
import { RelationshipContext } from "../_providers/RelationshipProvider";
import { RelationshipContextType } from "../_type/RelationshipType";
import LeftSidebar from "./_components/LeftSidebar";
import { ProfileContext } from "./_providers/SuggestsProvider";
import { ProfileContextType } from "./_type/SuggestsType";

const SuggestsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("profile_id");

  const { profile } = useContext(ProfileContext) as ProfileContextType;
  const {
    recommendRequestFriendship,
    setRecommendRequestFriendship,
    setIsLoading,
  } = useContext(RelationshipContext) as RelationshipContextType;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;

    const handleScroll = () => {
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          getRecommendAccountFriendship("", [], {
            page: recommendRequestFriendship.page + 1,
            size: recommendRequestFriendship.size,
            sortBy: [],
            sortOrder: [],
          })
            .then((response) => {
              setRecommendRequestFriendship({
                size: 10,
                page: recommendRequestFriendship.page + 1,
                data: [...recommendRequestFriendship.data, ...response.data],
              });
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setIsLoading(false);
            });
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendRequestFriendship]);
  return (
    <>
      <div
        ref={scrollRef}
        className="col-span-3 h-full overflow-y-auto flex justify-start bg-white shadow-md custom-scroll"
      >
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

export default SuggestsPage;
