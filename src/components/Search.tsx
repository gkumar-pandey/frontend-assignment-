import { ReactEventHandler, useState, KeyboardEvent, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { ImSearch } from "react-icons/im";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { resetUsersData, search, deleteSelectedUsers } from "../store/slice/userSlice";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");

    const dispatch = useAppDispatch();
    const { selectedUsers } = useAppSelector((state) => state.users)

    const onChangeHandler: ReactEventHandler<HTMLInputElement> = (e) => {
        setSearchQuery(e.currentTarget.value);
    };



    const filterBySearch = () => {
        if (searchQuery.trim() !== "") {
            dispatch(search(searchQuery));
        }
    };

    const onPressEnterBtn = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            filterBySearch();
        }
    };

    useEffect(() => {
        if (searchQuery.trim() === '') {
            dispatch(resetUsersData())
        }
    }, [searchQuery])

    const onSearchBtnClick = () => {
        if (searchQuery.trim() !== '') {
            dispatch(search(searchQuery))
        }
    }

    const isDeleteBtnDisable = selectedUsers.length === 0;



    return (
        <div className="flex items-center justify-between  py-2 ">
            <div className=" flex items-center justify-between overflow-hidden rounded-md border border-gray-800 ">
                <input
                    className="px-2 py-1 focus:outline-none"
                    value={searchQuery}
                    onChange={onChangeHandler}
                    onKeyDown={onPressEnterBtn}
                    placeholder="Search..."
                />
                <button
                    onClick={onSearchBtnClick}
                    className="search-icon cursor-pointer px-2 py-1 text-lg hover:bg-slate-50 "
                >
                    <ImSearch />
                </button>
            </div>
            <div>
                <button disabled={isDeleteBtnDisable} onClick={() => {
                    dispatch(deleteSelectedUsers())
                }} className={`rounded-md border bg-red-600 p-2 text-2xl text-white ${isDeleteBtnDisable && "bg-red-500 opacity-50 "} `}>
                    <MdOutlineDelete />
                </button>
            </div>
        </div>
    );
};

export default Search;
