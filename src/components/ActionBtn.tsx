import { FC } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface ActionBtnProps {
    deleteBtnHandler: (userId: number) => void;
    editBtnHandler: (userData: User) => void
    userData: User;
}

const ActionBtn: FC<ActionBtnProps> = ({ deleteBtnHandler, userData, editBtnHandler }) => {
    return (
        <div className=" flex gap-2  ">
            <button onClick={() => editBtnHandler(userData)} className="rounded-md border border-gray-700 p-1 text-xl">
                <LiaEditSolid />
            </button>
            <button
                className="rounded-md border border-gray-700 p-1 text-xl text-red-700 "
                onClick={() => deleteBtnHandler(userData?.id)}
            >
                <MdDeleteOutline />
            </button>
        </div>
    );
};

export default ActionBtn;
