"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import {
  getReceiverAccountFriendshipAndStatus,
  getRecommendAccountFriendship,
  getSenderAccountFriendshipAndStatus,
} from "services/AccountService";
import { PageResponse } from "types/responses/PageResponse";
import { AccountWithManualFriendResponse } from "types/responses/RecommendAccountResponse";
import { RelationshipContextType } from "../_type/RelationshipType";

export const RelationshipContext =
  createContext<RelationshipContextType | null>(null);

const defaultFriendshipRequest: PageResponse<AccountWithManualFriendResponse> =
  {
    page: 0,
    size: 10,
    data: [],
  };

const RelationshipProvider = (props: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [receiveRequest, setReceiveRequest] = useState<
    PageResponse<AccountWithManualFriendResponse>
  >(defaultFriendshipRequest);
  const [sendRequest, setSendRequest] = useState<
    PageResponse<AccountWithManualFriendResponse>
  >(defaultFriendshipRequest);
  const [recommendRequest, setRecommendRequest] = useState<
    PageResponse<AccountWithManualFriendResponse>
  >(defaultFriendshipRequest);

  useEffect(() => {
    const receiverPromise = getReceiverAccountFriendshipAndStatus(
      "PENDING",
      ""
    );
    const senderPromise = getSenderAccountFriendshipAndStatus("ACCEPTED", "");
    const recommendPromise = getRecommendAccountFriendship("");
    Promise.all([receiverPromise, senderPromise, recommendPromise])
      .then((responses) => {
        setReceiveRequest({
          ...receiveRequest,
          data: responses[0].data,
        });
        setSendRequest({
          ...sendRequest,
          data: responses[1].data,
        });
        setRecommendRequest({
          ...recommendRequest,
          data: responses[2].data,
        });
        setIsLoading(false);
      })
      .catch((errors) => {
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      receiveRequestFriendship: receiveRequest,
      sendRequestFriendship: sendRequest,
      recommendRequestFriendship: recommendRequest,
      setIsLoading,
      setReceiveRequestFriendship: setReceiveRequest,
      setSendRequestFriendship: setSendRequest,
      setRecommendRequestFriendship: setRecommendRequest,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, receiveRequest, sendRequest, recommendRequest]
  );

  return (
    <RelationshipContext.Provider value={value}>
      {props.children}
    </RelationshipContext.Provider>
  );
};

export default RelationshipProvider;
