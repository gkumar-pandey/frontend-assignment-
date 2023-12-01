
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";

const ActionBtn = () => {
    return (
        <div className=" gap-2 flex  " >
            <button className="p-1 border border-gray-700 rounded-md text-xl " >
                <LiaEditSolid />
            </button>
            <button className="p-1 border border-gray-700 rounded-md text-xl text-red-700 " >
                <MdDeleteOutline />
            </button>
        </div>
    );
};

export default ActionBtn;
