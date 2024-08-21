import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButton from "components/limb/buttons/IconButton";
import { TAB_CODE } from "app/(main)/home/_constant/HomeConstant";
import { ModalContext } from "app/(main)/home/_providers/ModalProvider";
import React, { useContext, useEffect, useState } from "react";
import { EmotionType, ModalContextType } from "app/(main)/home/_type/ModalType";
import Image from "next/image";

export const LeftIconComponent: React.FC = () => {
  const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

  return (
    <IconButton
      click={() => changeTabIndexModal(TAB_CODE.MAIN_TAB)}
      icon={faArrowLeft}
    />
  );
};

export const RightIconComponent: React.FC = () => {
  return <div className="w-12 h-12"></div>;
};

export const ChildrenIconComponent: React.FC = () => {
  const { dataModalState, setDataModalState, changeTabIndexModal } = useContext(
    ModalContext
  ) as ModalContextType;
  const [emotions, setEmotions] = useState<EmotionType[]>();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setEmotions(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const content = event.currentTarget.value;
    setSearchText(content);
  };

  const chooseEmotion = (emotion: EmotionType) => {
    if (dataModalState.emotion) {
      setDataModalState({
        ...dataModalState,
        emotion: undefined,
      });
    } else {
      setDataModalState({
        ...dataModalState,
        emotion,
      });
      changeTabIndexModal(TAB_CODE.MAIN_TAB);
    }
  };

  return (
    <div className="p-1 max-h-[400px] overflow-auto">
      <div className="flex items-center p-2 border border-gray-200 bg-white rounded">
        <span className="mr-2">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          onChange={onTextInputChange}
          type="text"
          className="outline-none grow"
          placeholder="Emotion's name"
        />
      </div>
      <ul className="grid grid-cols-2 gap-4 my-2">
        {emotions
          ?.filter((item) => item.text.startsWith(searchText))
          .map((item) => (
            <li
              onClick={() => chooseEmotion(item)}
              key={item.emotion_id}
              className={
                "flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer" +
                (item.emotion_id == dataModalState.emotion?.emotion_id
                  ? " bg-gray-200"
                  : "")
              }
            >
              <span className="mr-2 w-[50px] h-[50px]">
                <Image
                  layout="fill"
                  className="w-full h-full rounded-full"
                  src={item.imageUrl}
                  alt="Not found"
                />
              </span>
              <span className="text-md">{item.text}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const title = "What is your feeling?";
