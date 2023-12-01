import { FC } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

interface ActionBtnProps {
    deleteBtnHandler: (userId: number) => void;
    userId: number;
}

const ActionBtn: FC<ActionBtnProps> = ({ deleteBtnHandler, userId }) => {
    return (
        <div className=" flex gap-2  ">
            <button className="rounded-md border border-gray-700 p-1 text-xl ">
                <LiaEditSolid />
            </button>
            <button
                className="rounded-md border border-gray-700 p-1 text-xl text-red-700 "
                onClick={() => deleteBtnHandler(userId)}
            >
                <MdDeleteOutline />
            </button>
        </div>
    );
};

export default ActionBtn;
