import { Dispatch, SetStateAction } from "react"
import { AccountSummaryInfoResponse } from "types/responses/AccountSummaryInfoResponseType"
import { CheckinResponseType } from "types/responses/CheckinResponseType"

export type SubTabType = {
  title: string,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
  children?: React.ReactNode
}

export type ImageModalType = {
  id: string,
  file: File,
  selectedText?: string,
  tags?: TagImageType[],
  note?: string,
  texts?: TextImageType[]
}

export type TagImageType = {
  id: string,
  account: any,
  x_pos: number,
  y_pos: number
}

export type TextImageType = {
  id: string,
  text: string,
  color: string,
  x_pos: number,
  y_pos: number,
  size: number
}

export type VideoModalType = {
  id: string,
  file: File,
  note?: string
}

export type ModalContextType = {
  controlModalState: ControlStateType,
  setControlModalState: Dispatch<SetStateAction<ControlStateType>>,
  tabModalState: TabStateType,
  setTabModalState: Dispatch<SetStateAction<TabStateType>>,
  dataModalState: DataStateType
  setDataModalState: Dispatch<SetStateAction<DataStateType>>,
  changeTabIndexModal: (tabIndex: number, fileModal?: VideoModalType | ImageModalType, navTabDetailIndex?: number) => void,
  changeFieldDataFieldModal: (fileModal: VideoModalType | ImageModalType) => void
};

export type ControlStateType = {
  tabIndex: number,
  isShowModal: boolean,
  isChooseFile: boolean,
  navTabDetailIndex: number,
  isShowEmoji: boolean
}

export type TabStateType = {
  funcTab: SubTabType,
  detailFuncTab: SubTabType
}

export type DataStateType = {
  text: string,
  files: (ImageModalType | VideoModalType)[],
  tags: AccountSummaryInfoResponse[],
  emotion?: EmotionType,
  checkin?: CheckinResponseType
}

export type ModalParameterType = {
  children?: React.ReactNode,
  isShow: boolean,
  width?: "max-w-2xl" | "max-w-3xl" | "max-w-[1550px]",
  onClickOutside?: () => void
}

export type EmotionType = {
  emotion_id: number,
  text: string,
  imageUrl: string
}