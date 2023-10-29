
import React from 'react';

import { AccountWithManualFriendResponse } from 'types/responses/RecommendAccountResponse';
import Button from '../buttons/Button';

type ConfirmFriendCardTypeProps = {
    account: AccountWithManualFriendResponse,
    onConfirm: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void,
    onReject: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

const ConfirmFriendCardVertical: React.FC<ConfirmFriendCardTypeProps> = (props) => {
    const { account, onConfirm, onReject } = props;

    return (
        <div className="bg-white mr-2 rounded overflow-hidden shadow-md">
            <div className="mb-2 h-[200px]">
                <img className="w-full h-full" src={account.profilePictureUrl} alt="Not found" />
            </div>
            <div className="px-1 font-bold">{account.lastName + " " + account.firstName}</div>
            <div className="flex m-1">
                {
                    account.manualFriends && account.manualFriends.length > 0 && (
                        <div className="flex items-center">
                            {
                                account.manualFriends.slice(0, 3).map((item, index) => (
                                    <div key={item.accountId} className={"w-5 h-5" + (index > 0 ? " ml-[-10px]" : "")}>
                                        <img className="w-full h-full rounded-full border-white border" src={item.profilePictureUrl} alt="Not found" />
                                    </div>
                                ))
                            }
                            {
                                account.manualFriends.length >= 3 && (
                                    <div className="w-5 h-5 flex justify-center items-center ml-[-10px] bg-gray-500 text-white text-sm rounded-full border-white border">+{account.manualFriends.length - 3}</div>
                                )
                            }
                            <div className="px-1 ml-1">{account.manualFriends.length} manual friends</div>
                        </div>
                    )
                }
            </div>
            <div className="px-2 mb-2">
                <Button
                    onClick={(e) => onConfirm(e, account.accountId)}
                    type="button"
                    size="large"
                    block="true"
                    fontSize="text-md"
                    fontWeight="font-medium"
                    bg="bg-blue-600"
                >
                    Confrim
                </Button>
            </div>
            <div className="px-2 mb-2">
                <Button
                    onClick={(e) => onReject(e, account.accountId)}
                    type="button"
                    size="large"
                    block="true"
                    fontSize="text-md"
                    fontWeight="font-medium"
                    bg="bg-gray-300"
                    color="text-black"
                >
                    Delete
                </Button>
            </div>
        </div>

    )

}

export default ConfirmFriendCardVertical;