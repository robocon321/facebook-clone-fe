export const TAB_CODE_GROUP = {
  MAIN_GROUP: 0,
  FUNC_GROUP: 10,
  DETAIL_FUNC_GROUP: 20,
};

export const TAB_CODE = {
  // Open main tab
  MAIN_TAB: TAB_CODE_GROUP.MAIN_GROUP,
  // Open func tab
  ADD_TO_POST: TAB_CODE_GROUP.FUNC_GROUP,
  EDIT_FILE: TAB_CODE_GROUP.FUNC_GROUP + 1,
  TAG_FRIEND: TAB_CODE_GROUP.FUNC_GROUP + 2,
  EMOTION: TAB_CODE_GROUP.FUNC_GROUP + 3,
  CHECKIN: TAB_CODE_GROUP.FUNC_GROUP + 4,
  SCOPE: TAB_CODE_GROUP.FUNC_GROUP + 5,
  // Open detail func tab
  DETAIL_IMAGE: TAB_CODE_GROUP.DETAIL_FUNC_GROUP,
  DETAIL_VIDEO: TAB_CODE_GROUP.DETAIL_FUNC_GROUP + 1,
};

export const TAB_IMAGE_NAV_CODE = {
  TEXTAREA: 0,
  CROP: 1,
  ROTATE: 2,
  TAG: 3,
  TEXT: 4,
  REPLACE: 5,
};

export const TAB_VIDEO_NAV_CODE = {
  TEXTAREA: 0,
  THUMBNAIL: 1,
  NOTE: 2,
};

export const EMOTION_LIST = [
  {
    id: 0,
    type: "HAHA",
    text: "Haha",
    png: "haha.png",
    gif: "haha.gif",
    color: "text-yellow-900",
    bg: "bg-yellow-100",
  },
  {
    id: 1,
    type: "LIKE",
    text: "Like",
    png: "like.png",
    gif: "like.gif",
    color: "text-blue-900",
    bg: "bg-blue-100",
  },
  {
    id: 2,
    type: "HEART",
    text: "Heart",
    png: "heart.png",
    gif: "heart.gif",
    color: "text-red-900",
    bg: "bg-red-100",
  },
  {
    id: 3,
    type: "LOVE",
    text: "Love",
    png: "love.png",
    gif: "love.gif",
    color: "text-yellow-900",
    bg: "bg-yellow-100",
  },
  {
    id: 4,
    type: "WOW",
    text: "Wow",
    png: "wow.png",
    gif: "wow.gif",
    color: "text-yellow-900",
    bg: "bg-yellow-100",
  },
  {
    id: 5,
    type: "CRY",
    text: "Cry",
    png: "cry.png",
    gif: "cry.gif",
    color: "text-blue-900",
    bg: "bg-blue-100",
  },
  {
    id: 6,
    type: "ANGRY",
    text: "Angry",
    png: "angry.png",
    gif: "angry.gif",
    color: "text-red-900",
    bg: "bg-red-100",
  },
];
