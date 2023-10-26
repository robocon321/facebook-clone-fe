import { faArrowLeft, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'app/(main)/home/_constant/HomeConstant';
import { ModalContext } from 'app/(main)/home/_providers/ModalProvider';
import React, { useContext, useState } from 'react';
import { getAccountFriendshipAndStatus } from 'services/AccountService';
import { ModalContextType } from 'app/(main)/home/_type/ModalType';
import { AccountSummaryInfoResponse } from 'types/responses/AccountSummaryInfoResponseType';

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
    const { dataModalState, setDataModalState } = useContext(ModalContext) as ModalContextType;
    const [searchFriends, setSearchFriends] = useState<AccountSummaryInfoResponse[]>();

    const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const content = event.currentTarget.value;
        const excludeIds = dataModalState.tags.map(item => item.accountId);
        getAccountFriendshipAndStatus('ACCEPTED', content, excludeIds)
            .then(data => {
                setSearchFriends(data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onAddFriendTag = (account: AccountSummaryInfoResponse) => {
        setDataModalState({
            ...dataModalState,
            tags: [...dataModalState.tags, account]
        });
        setSearchFriends(searchFriends?.filter(item => item.accountId != account.accountId));
    }

    const onRemoveFriendTag = (id: number) => {
        setDataModalState({
            ...dataModalState,
            tags: dataModalState.tags.filter(item => item.accountId != id)
        });
    }

    const isTagNonEmpty = (): boolean => {
        return dataModalState.tags != undefined && dataModalState.tags.length != 0;
    }


    return (
        <div className="p-1">
            <div className="flex items-center p-2 border border-gray-200 bg-white rounded">
                <span className="mr-2"><FontAwesomeIcon icon={faSearch} /></span>
                <input onChange={onTextInputChange} type="text" className="outline-none grow" placeholder="Friend's name" />
            </div>
            {
                isTagNonEmpty() && <div className="border border-gray-200 my-2 max-h-[300px] text-sm p-2">
                    <div className="text-gray-500">List tagged friends</div>
                    <div className="flex flex-wrap">
                        {
                            dataModalState.tags.map(item => (
                                <div key={item.accountId} className="flex justify-between items-center m-2 bg-blue-100 text-blue-600 min-w-[150px] rounded p-2">
                                    <div>{item.firstName + " " + item.lastName}</div>
                                    <div key={item.accountId} className="hover:bg-gray-200 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
                                        onClick={() => onRemoveFriendTag(item.accountId)}>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
            <div className="pt-2">
                {searchFriends && <div className="text-gray-600">Suggest</div>}
                <ul className="pt-2">
                    {
                        searchFriends?.map(item => (
                            <li key={item.accountId} onClick={() => onAddFriendTag(item)} className="flex items-center p-2 hover:bg-gray-200 rounded">
                                <span className="mr-2 w-[50px] h-[50px]"><img className="w-full h-full rounded-full" src="https://random.imagecdn.app/500/400" alt="Not found" /></span>
                                <span className="text-md">{item.firstName + " " + item.lastName}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
};

export const title = "Tag your friends";