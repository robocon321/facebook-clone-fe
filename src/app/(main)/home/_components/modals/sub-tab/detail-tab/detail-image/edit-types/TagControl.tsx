import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import {
  ImageModalType,
  ModalContextType,
  TagImageType,
} from "app/(main)/home/_type/ModalType";
import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { getAccountFriendshipAndStatus } from "services/AccountService";
import { AccountResponse } from "types/responses/AccountResponse";
import { generateRandomString } from "utils/RandomUtils";

type TagEditPropsType = {
  fileModal: ImageModalType;
  imageRef: React.MutableRefObject<HTMLImageElement | null>;
};

const Tag = forwardRef((props: TagEditPropsType, ref) => {
  const { changeFieldDataFileModal } = useContext(
    ModalContext
  ) as ModalContextType;
  const { fileModal, imageRef } = props;

  const [searchFriends, setSearchFriends] = useState<AccountResponse[]>();

  useImperativeHandle(
    ref,
    () => {
      return {
        handleClick: (event: React.MouseEvent) => {
          setSearchFriends([]);
          if (imageRef.current) {
            const image = imageRef.current;
            const imageLeft = image.getBoundingClientRect().left;
            const imageTop = image.getBoundingClientRect().top;
            const imageWidth = image.getBoundingClientRect().width;
            const imageHeight = image.getBoundingClientRect().height;

            const x = event.clientX - imageLeft;
            const y = event.clientY - imageTop;

            const percentX = (x * 100) / imageWidth;
            const percentY = (y * 100) / imageHeight;

            const newTag: TagImageType = {
              id: generateRandomString(10),
              account: null,
              x_pos: percentX,
              y_pos: percentY,
            };

            fileModal.tags = fileModal.tags.filter(
              (item) => item.account != null
            );
            fileModal.tags = [...fileModal.tags, newTag];
            changeFieldDataFileModal(fileModal);
          }
        },
      };
    },
    []
  );

  const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const content = event.currentTarget.value;
    const excludeIds = fileModal.tags
      .filter((item) => item.account != null)
      .map((item) => item.account.accountId);
    getAccountFriendshipAndStatus("ACCEPTED", content, excludeIds)
      .then((data) => {
        setSearchFriends(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onAddFriendTag = (account: AccountResponse) => {
    const lastTag = fileModal.tags[fileModal.tags.length - 1];
    lastTag.account = account;
    fileModal.tags[fileModal.tags.length - 1] = lastTag;
    changeFieldDataFileModal(fileModal);
  };

  const onRemoveFriendTag = (accountId: number) => {
    fileModal.tags = fileModal.tags.filter(
      (item) => item.account != null && item.account.accountId != accountId
    );
    changeFieldDataFileModal(fileModal);
  };

  return (
    <>
      {fileModal.tags.map((item) => {
        let imageHeight = 0;
        let imageWidth = 0;
        if (imageRef.current) {
          const image = imageRef.current;
          imageWidth = image.getBoundingClientRect().width;
          imageHeight = image.getBoundingClientRect().height;
        }
        if (item.account) {
          const top = `${(item.y_pos * imageHeight) / 100}px`;
          const left = `${(item.x_pos * imageWidth) / 100 - 50}px`;
          return (
            <div
              key={item.id}
              style={{
                top,
                left,
              }}
              className={"absolute flex flex-col items-center"}
            >
              <div className="flex justify-centers">
                <svg
                  height="12"
                  viewBox="0 0 25 12"
                  width="25"
                  fill="#ffffff"
                  style={{
                    transform: "scale(1, -1)",
                    translate: "0px 0px",
                  }}
                >
                  <path d="M24.553.103c-2.791.32-5.922 1.53-7.78 3.455l-9.62 7.023c-2.45 2.54-5.78 1.645-5.78-2.487V2.085C1.373 1.191.846.422.1.102h24.453z"></path>
                </svg>
              </div>
              <div className="flex justify-between items-center bg-white p-2 min-w-[200px] rounded">
                <span>{`${item.account.firstName} ${item.account.lastName}`}</span>
                <span
                  className="hover:bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center"
                  onClick={() => onRemoveFriendTag(item.account.accountId)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </span>
              </div>
            </div>
          );
        } else {
          const top = `${(item.y_pos * imageHeight) / 100 - 50}px`;
          const left = `${(item.x_pos * imageWidth) / 100 - 120}px`;
          return (
            <div
              key={item.id}
              style={{
                top,
                left,
              }}
              className={"absolute flex flex-col items-center"}
            >
              <div
                style={{
                  backgroundColor: "rgba(222, 222, 222, 0.3)",
                  boxShadow: "0px 0px 3px 0px rgba(0, 0, 0, 1)",
                }}
                className="mb-2 border border-white w-[100px] h-[100px] rounded"
              ></div>
              <div className="p-2 bg-white">
                <div className="flex items-center p-2 border border-gray-200 bg-white rounded">
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="text"
                    className="outline-none"
                    placeholder="Friend's name"
                    onChange={onTextInputChange}
                  />
                </div>
                <ul className="w-full bg-white mt-1">
                  {searchFriends?.map((item) => (
                    <li
                      key={item.accountId}
                      onClick={() => onAddFriendTag(item)}
                      className="flex items-center p-2 hover:bg-gray-200 rounded"
                    >
                      <span className="mr-2 w-[20px] h-[20px]">
                        <img
                          className="w-full h-full rounded-full"
                          src="https://random.imagecdn.app/500/400"
                          alt="Not found"
                        />
                      </span>
                      <span>{item.firstName + " " + item.lastName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }
      })}
    </>
  );
});

Tag.displayName = "Tag";

export default Tag;
