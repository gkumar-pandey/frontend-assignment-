import { ReactEventHandler, SetStateAction, useState, KeyboardEvent } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { search } from "../store/slice/userSlice";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const dispatch = useAppDispatch()
    const onChangeHandler: ReactEventHandler<HTMLInputElement> = (e) => {
        setSearchQuery(e.currentTarget.value);
        onSearchBtnClick()
    };

    const onSearchBtnClick = () => {
        dispatch(search(searchQuery))
    }

    const onPressEnterBtn = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            onSearchBtnClick()
        }

    }





    return (
        <div className="flex items-center justify-between  py-2 ">
            <div className=" flex items-center justify-between rounded-md border border-gray-800 overflow-hidden ">
                <input
                    className="focus:outline-none px-2 py-1"
                    value={searchQuery}
                    onChange={onChangeHandler}
                    onKeyDown={onPressEnterBtn}
                    placeholder="Search..."
                />
                <button onClick={onSearchBtnClick} className="text-lg px-2 py-1 hover:bg-slate-50 cursor-pointer search-icon " >
                    <ImSearch />
                </button>
            </div>
            <div>
                <button className="rounded-md border bg-red-600 p-2 text-2xl  text-white">
                    <MdOutlineDelete />
                </button>
            </div>
        </div>
    );
};

export default Search;
