import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from 'components/limb/buttons/IconButton';
import { TAB_CODE } from 'app/(main)/home/_constant/HomeConstant';
import { ModalContext } from 'app/(main)/home/_providers/ModalProvider';
import React, { useContext, useEffect, useState } from 'react';
import { ModalContextType } from 'app/(main)/home/_type/ModalType';
import { PageRequest } from "types/requests/PageRequest";
import { getCheckinLocation } from "services/CheckinService";
import { CheckinResponseType } from 'types/responses/CheckinResponse';

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
    const [locations, setLocations] = useState<CheckinResponseType[]>([]);

    useEffect(() => {
        const pageRequest: PageRequest = {
            page: 0,
            size: 20,
            sortBy: [],
            sortOrder: []
        }
        getCheckinLocation("", pageRequest)
            .then(response => {
                setLocations(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const onTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const content = event.currentTarget.value;
        const pageRequest: PageRequest = {
            page: 0,
            size: 20,
            sortBy: [],
            sortOrder: []
        }
        getCheckinLocation(content, pageRequest)
            .then(response => {
                setLocations(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const onSelectCheckinLocation = (checkin: CheckinResponseType) => {
        if(dataModalState.checkin) {
            setDataModalState({
                ...dataModalState,
                checkin: undefined
            })
        } else {
            setDataModalState({
                ...dataModalState,
                checkin
            });
            changeTabIndexModal(TAB_CODE.MAIN_TAB);
        }
    }


    return (
        <div className="p-1 max-h-[400px] overflow-auto">
            <div className="flex items-center p-2 border border-gray-200 bg-white rounded">
                <span className="mr-2"><FontAwesomeIcon icon={faSearch} /></span>
                <input onChange={onTextInputChange} type="text" className="outline-none grow" placeholder="Search location" />
            </div>
            <ul className="my-2">
                {
                    locations.map(item => (
                        <li onClick={() => onSelectCheckinLocation(item)} key={item.checkinId} className={"flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer" + (dataModalState.checkin?.checkinId == item.checkinId ? " bg-gray-200" : "")}>
                            <div className="mr-3 w-[50px] h-[50px] bg-gray-600 rounded overflow-hidden"><img className="w-full h-full rounded-full" src="/location.png" alt="Not found" /></div>
                            <div>
                                <div className="text-md">{item.address + ", " + item.city}</div>
                                <div className="text-sm">{item.country}</div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
};

export const title = "Where are you now?";