import {
  faEarthAmericas,
  faEllipsis,
  faSortDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "app/_providers/AppProvider";
import ModalTemplate from "components/limb/modal/ModalTemplate";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import React, { useContext } from "react";

import DragDropFiles from "app/(main)/home/_components/modals/main-tab/DragDropFiles";
import { TAB_CODE } from "app/(main)/home/_constant/HomeConstant";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import { ModalContextType } from "app/(main)/home/_type/ModalType";
import { AppContextType } from "app/_type/AppType";
import Button from "components/limb/buttons/Button";
import IconButton from "components/limb/buttons/IconButton";
import { createNewArticle } from "services/ArticleService";

const LeftIconComponent: React.FC = () => {
  return <div className="rounded-50 w-12 h-12"></div>;
};

const RightIconComponent: React.FC = () => {
  const { controlModalState, setControlModalState } = useContext(
    ModalContext
  ) as ModalContextType;
  return (
    <IconButton
      click={() =>
        setControlModalState({
          ...controlModalState,
          isShowModal: false,
          isShowEmoji: false,
        })
      }
      icon={faXmark}
    />
  );
};

const MainTab: React.FC = () => {
  const {
    dataModalState,
    setDataModalState,
    controlModalState,
    setControlModalState,
    changeTabIndexModal,
    resetDataModal,
  } = useContext(ModalContext) as ModalContextType;
  const { appState } = useContext(AppContext) as AppContextType;

  const onChooseEmoji = (emojiData: EmojiClickData, event: MouseEvent) => {
    setDataModalState((previous) => {
      return {
        ...dataModalState,
        text:
          previous.text +
          (emojiData.isCustom ? emojiData.unified : emojiData.emoji),
      };
    });
  };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataModalState({
      ...dataModalState,
      text: e.currentTarget ? e.currentTarget.value : "",
    });
  };

  const isEnableToSubmit = () => {
    return (
      dataModalState.checkin ||
      dataModalState.emotion ||
      dataModalState.files.length > 0 ||
      dataModalState.tags.length > 0 ||
      (dataModalState.text ? dataModalState.text.length > 0 : false)
    );
  };

  const submit = async () => {
    if (isEnableToSubmit()) {
      setControlModalState((previous) => ({
        ...previous,
        isLoading: true,
      }));
      await createNewArticle(dataModalState)
        .then((response) => {
          setControlModalState((previous) => ({
            ...previous,
            isLoading: false,
          }));
          resetDataModal();
        })
        .catch((error) => {
          setControlModalState((previous) => ({
            ...previous,
            isLoading: false,
          }));
          alert(error);
        });
    }
  };

  return (
    <ModalTemplate
      title="Create new article"
      leftIcon={<LeftIconComponent />}
      rightIcon={<RightIconComponent />}
    >
      <div
        className={
          "px-4" +
          (controlModalState.tabIndex == TAB_CODE.MAIN_TAB ? " h-auto" : " h-0")
        }
      >
        <div className="flex items-center">
          <div className="rounded-full min-w-[50px] min-h-[50px] w-[50px] h-[50px] mr-2 overflow-hidden">
            <img src={"https://random.imagecdn.app/200/200"} alt="Not found" />
          </div>
          <div>
            <ul className="flex flex-wrap">
              <li>
                <a className="hover:underline" href="#">
                  <b>
                    {appState.data.user?.lastName +
                      " " +
                      appState.data.user?.firstName}
                  </b>
                </a>
              </li>
              {dataModalState.emotion && (
                <div className="flex">
                  <span className="mx-1">is feeling</span>
                  <span className="mx-1">{dataModalState.emotion.text}</span>
                  <img
                    className="mx-1 w-[25px] h-[25px]"
                    src={dataModalState.emotion.imageUrl}
                    alt="Not found"
                  />
                </div>
              )}
              {dataModalState.checkin && (
                <div className="flex">
                  <span className="mx-1">is living</span>
                  <span className="mx-1 hover:underline">
                    <a href="#">
                      <b>
                        {dataModalState.checkin.address +
                          ", " +
                          dataModalState.checkin.city +
                          ", " +
                          dataModalState.checkin.country}
                      </b>
                    </a>
                  </span>
                </div>
              )}
              {dataModalState.tags.length > 0 && (
                <span className="mx-1">with</span>
              )}
              {dataModalState.tags.slice(0, 3).map((item, index) => {
                return (
                  <li key={item.accountId}>
                    <a className="hover:underline" href="#">
                      <b>
                        {item.lastName +
                          " " +
                          item.firstName +
                          (index < 2 && dataModalState.tags.length - 1 != index
                            ? ", "
                            : " ")}
                      </b>
                    </a>
                  </li>
                );
              })}
              {dataModalState.tags.length > 3 && (
                <li>
                  <span className="mx-1">and</span>
                  <a className="hover:underline" href="#">
                    <b> {dataModalState.tags.length - 3} other people</b>
                  </a>
                </li>
              )}
            </ul>
            <button
              onClick={() => changeTabIndexModal(TAB_CODE.SCOPE)}
              className="text-sm bg-gray-300 flex items-center justify-center py-1 px-2 rounded-lg max-w-[150px] cursor-pointer"
            >
              <span>
                <FontAwesomeIcon icon={faEarthAmericas} />
              </span>
              <span className="mx-3">
                {dataModalState.scope == "PUBLIC"
                  ? "Public"
                  : dataModalState.scope == "FRIEND"
                  ? "Friends"
                  : "Private"}
              </span>
              <span>
                <FontAwesomeIcon icon={faSortDown} />
              </span>
            </button>
          </div>
        </div>
        <div className="py-4">
          <textarea
            value={dataModalState.text}
            onChange={onChangeText}
            rows={5}
            className="max-h-20 w-full outline-0 text-xl resize-none"
            placeholder="Hi you, what's on your mind?"
          ></textarea>
          {(dataModalState.files.length > 0 ||
            controlModalState.isChooseFile) && <DragDropFiles />}
          <div className="py-4 flex justify-between items-center">
            <div className="w-10 h-10 cursor-pointer">
              <img
                className="w-full h-full"
                src="/choose-bg.png"
                alt="Not found"
              />
            </div>
            <div className="relative w-8 h-8 cursor-pointer">
              {controlModalState.isShowEmoji && (
                <button
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  className="fixed bottom-[10px]"
                >
                  <EmojiPicker
                    onEmojiClick={onChooseEmoji}
                    height={400}
                    previewConfig={{
                      showPreview: false,
                    }}
                  />
                </button>
              )}
              <img
                onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                  e.stopPropagation();
                  setControlModalState({
                    ...controlModalState,
                    isShowEmoji: true,
                  });
                }}
                className="w-full h-full"
                src="/emoji.png"
                alt="Not found"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center py-4 border-[0.5px] rounded border-gray-400">
          <div
            onClick={() => changeTabIndexModal(TAB_CODE.ADD_TO_POST)}
            className="px-2 cursor-pointer"
          >
            Thêm vào bài viết của bạn
          </div>
          <div
            onClick={() =>
              setControlModalState({
                ...controlModalState,
                isChooseFile: true,
              })
            }
            className={
              "px-2 cursor-pointer hover:bg-gray-200 active:bg-gray-300  rounded-full w-10 h-10 flex justify-center items-center" +
              (dataModalState.files.length > 0 ? " bg-gray-200" : " ")
            }
          >
            <img src="/image.png" alt="Not found" />
          </div>
          <div
            onClick={() => changeTabIndexModal(TAB_CODE.TAG_FRIEND)}
            className={
              "px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" +
              (dataModalState.tags.length > 0 ? " bg-gray-200" : " ")
            }
          >
            <img src="/tag.png" alt="Not found" />
          </div>
          <div
            onClick={() => changeTabIndexModal(TAB_CODE.EMOTION)}
            className={
              "px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" +
              (dataModalState.emotion ? " bg-gray-200" : " ")
            }
          >
            <img src="/emoji-yellow.png" alt="Not found" />
          </div>
          <div
            onClick={() => changeTabIndexModal(TAB_CODE.CHECKIN)}
            className={
              "px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center" +
              (dataModalState.checkin ? " bg-gray-200" : " ")
            }
          >
            <img src="/locate.png" alt="Not found" />
          </div>
          <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
            <img src="/gif.png" alt="Not found" />
          </div>
          <div className="px-2 cursor-pointer hover:bg-gray-200 rounded-full w-10 h-10 flex justify-center items-center">
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        </div>
        <div className="my-2">
          <Button
            onClick={() => submit()}
            type="button"
            size="large"
            block="true"
            fontSize="text-xl"
            fontWeight="font-bold"
            bg={isEnableToSubmit() ? "bg-blue-600" : "bg-gray-300"}
            color={isEnableToSubmit() ? "text-white" : "text-gray-600"}
            isdisabled={!isEnableToSubmit() + ""}
            isloading={controlModalState.isLoading + ""}
          >
            Article
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default MainTab;
