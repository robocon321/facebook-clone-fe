export const TAB_CODE_GROUP = {
    MAIN_GROUP: 0,
    FUNC_GROUP: 10,
    DETAIL_FUNC_GROUP: 20
}

export const TAB_CODE = {
    // Open main tab
    MAIN_TAB: TAB_CODE_GROUP.MAIN_GROUP,
    // Open func tab
    ADD_TO_POST: TAB_CODE_GROUP.FUNC_GROUP,
    EDIT_FILE: TAB_CODE_GROUP.FUNC_GROUP + 1,
    // Open detail func tab
    DETAIL_IMAGE: TAB_CODE_GROUP.DETAIL_FUNC_GROUP,
    DETAIL_VIDEO: TAB_CODE_GROUP.DETAIL_FUNC_GROUP + 1,
}

export const TAB_IMAGE_NAV_CODE = {
    TEXTAREA: 0,
    CROP: 1,
    ROTATE: 2,
    TAG: 3,
    TEXT: 4,
    REPLACE: 5
}

export const TAB_VIDEO_NAV_CODE = {
    TEXTAREA: 0,
    THUMBNAIL: 1,
    NOTE: 2
}