import { faArrowLeft, faEarthAmerica, faLock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'app/(main)/home/_constant/HomeConstant';
import { ModalContext } from 'app/(main)/home/_providers/ModalProvider';
import React, { useContext } from 'react';
import { ModalContextType } from 'app/(main)/home/_type/ModalType';

export const LeftIconComponent: React.FC = () => {
    const { changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    return (
        <IconButton click={
            () => changeTabIndexModal(TAB_CODE.MAIN_TAB)
        } icon={faArrowLeft} />
    )
};

export const RightIconComponent: React.FC = () => {
    return (
        <div className="w-12 h-12"></div>
    )
};

export const ChildrenIconComponent: React.FC = () => {
    const { dataModalState, setDataModalState, changeTabIndexModal } = useContext(ModalContext) as ModalContextType;

    const changeScope = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataModalState({
            ...dataModalState,
            scope: e.target.value
        });
        changeTabIndexModal(TAB_CODE.MAIN_TAB);
    }

    return (
        <div className="p-1 max-h-[400px] overflow-auto">
            <div className="my-2">
                <div><b>Who can see your post?</b></div>
                <p className="my-2 text-gray-500">Your post will appear in your feed, personal page and search results.</p>
                <p className="text-gray-500">Although the default audience is <b>Public</b>, you can change the audience for this particular post.</p>
            </div>
            <div className="my-2">
                <label htmlFor="public" className="flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-200">
                    <div>
                        <IconButton icon={faEarthAmerica} />
                    </div>
                    <div className="grow mx-2">
                        <h3><b>Public</b></h3>
                        <p>Anyone on or off Facebook</p>
                    </div>
                    <div>
                        <input
                            onChange={changeScope}
                            checked={dataModalState.scope == "PUBLIC"}
                            id="public"
                            type="radio"
                            className="w-[20px] h-[20px]"
                            name="scope"
                            value="PUBLIC" />
                    </div>
                </label>
                <label htmlFor="friend" className="flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-200">
                    <div>
                        <IconButton icon={faUserGroup} />
                    </div>
                    <div className="grow mx-2">
                        <h3><b>Friends</b></h3>
                        <p>Only you and your friends on Facebook</p>
                    </div>
                    <div>
                        <input
                            onChange={changeScope}
                            checked={dataModalState.scope == "FRIEND"}
                            id="friend"
                            type="radio"
                            className="w-[20px] h-[20px]"
                            name="scope"
                            value="FRIEND" />
                    </div>
                </label>
                <label htmlFor="me" className="flex items-center justify-between p-2 cursor-pointer rounded hover:bg-gray-200">
                    <div>
                        <IconButton icon={faLock} />
                    </div>
                    <div className="grow mx-2">
                        <h3><b>Only you</b></h3>
                    </div>
                    <div>
                        <input
                            onChange={changeScope}
                            checked={dataModalState.scope == "ME"}
                            id="me"
                            type="radio"
                            className="w-[20px] h-[20px]"
                            name="scope"
                            value="ME" />
                    </div>
                </label>

            </div>
        </div>
    )
};

export const title = "Post scope";