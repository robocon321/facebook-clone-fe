/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Client } from "@stomp/stompjs";
import {
  AccountHistoryResponse,
  AppContextType,
  AppStateType,
} from "app/_type/AppType";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  getHistoryAccount,
  getSummaryAccount,
  updateHistoryAccount,
} from "services/AccountService";
import { PageRequest } from "types/requests/PageRequest";

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const allowedPaths = ["login", "signup", "gaming"];

  let [client, setClient] = useState<Client | null>(null);
  let [subcriptions, setSubcriptions] = useState<string[]>([]);
  const [appState, setAppState] = useState<AppStateType>({
    isLoading: true,
    data: {
      user: null,
      message: null,
      error: null,
    },
  });

  const [accountHistories, setAccountHistories] = useState<
    AccountHistoryResponse[]
  >([]);

  useEffect(() => {
    if (
      pathnameSplit.length > 1 &&
      !allowedPaths.find((item) => item == pathnameSplit[1])
    ) {
      loadUser();
    } else {
      setAppState({
        ...appState,
        isLoading: false,
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && appState.data.user) {
      const stompClient = new Client({
        brokerURL: `${process.env.WEB_SOCKET_URL}/friend`,
        connectHeaders: {
          token: token,
        },
        reconnectDelay: 2000,
      });
      stompClient.activate();

      stompClient.onConnect = () => {
        const currentSubcriptionId = stompClient.subscribe(
          "/user/friend-topic/online-friend",
          (message) => {
            const jsonBody = JSON.parse(message.body);
            setAccountHistories((previous) => {
              const currentAccountHistoryIndex = previous.findIndex((item) => {
                return item.account.accountId == jsonBody.accountId;
              });
              if (currentAccountHistoryIndex >= 0) {
                const currentAccountHistory =
                  previous[currentAccountHistoryIndex];
                currentAccountHistory.currentHistory.actionTime = new Date();
                currentAccountHistory.currentHistory.status = jsonBody.create
                  ? "ONLINE"
                  : "OFFLINE";
                return [
                  ...previous.slice(0, currentAccountHistoryIndex),
                  currentAccountHistory,
                  ...previous.slice(
                    currentAccountHistoryIndex + 1,
                    previous.length
                  ),
                ];
              }
              return previous;
            });
          },
          {
            token: token,
          }
        ).id;

        setSubcriptions([...subcriptions, currentSubcriptionId]);
        setClient(stompClient);
      };
    }
  }, [appState.data.user]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      updateHistoryAccount("OFFLINE").catch((error) => console.error(error));

      if (client?.active) {
        client.publish({
          destination: "/friend-app/online-friend/delete",
        });
      }

      subcriptions.forEach((item) => {
        client?.unsubscribe(item);
      });
      client?.deactivate();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (client?.active) {
      client.publish({
        destination: "/friend-app/online-friend/create",
      });
    }

    return () => {
      client?.deactivate();
      subcriptions.forEach((item) => {
        client?.unsubscribe(item);
      });
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [client]);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      getSummaryAccount()
        .then((user) => {
          setAppState({
            isLoading: false,
            data: {
              user,
              message: "Successfully",
              error: null,
            },
          });
        })
        .catch((error: Error) => {
          setAppState({
            isLoading: false,
            data: {
              user: null,
              message: null,
              error: error.message,
            },
          });
          router.push("/login");
        });

      const pageRequest: PageRequest = {
        page: 0,
        size: 20,
        sortBy: [],
        sortOrder: [],
      };

      getHistoryAccount(undefined, pageRequest)
        .then((response) => {
          setAccountHistories(response.data);
        })
        .catch((error) => console.error(error));

      updateHistoryAccount("ONLINE").catch((error) => console.error(error));
    }
  };

  const value = useMemo(
    () => ({
      loadUser,
      setAppState,
      appState,
      accountHistories,
    }),
    [appState, accountHistories]
  );

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppProvider;
