import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import {
    deleteUser,
    selectUsers,
    deselectUsers,
    selectAllUsersOnCrrPage,
    deselectAllUsersOnCurrPage,
    editUserData,
} from "../store/slice/userSlice";
import ActionBtn from "./ActionBtn";
import { useState } from "react";
import EditUser from "./EditUser";

interface TableProps {
    dataPerPage: User[];

}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const tableHeadData: string[] = ["Name", "Email", "Role", "Action"];

const Table: FC<TableProps> = ({ dataPerPage }) => {
    const [editableRowData, setEditableRowData] = useState<null | User>(null);
    const dispatch = useAppDispatch();
    const { selectedUsers } = useAppSelector(
        (state) => state.users,
    );

    const deleteUserBtnHandler = (userId: number) => {
        dispatch(deleteUser(userId));
    };

    const onCheckedHandler = (e: any, user: User) => {
        if (e.target.checked) {
            dispatch(selectUsers(user));
        } else {
            dispatch(deselectUsers(user));
        }
    };

    const selectAllRowsOnCurrPage = (e: any) => {
        if (e.target.checked) {
            dispatch(selectAllUsersOnCrrPage(dataPerPage));
        } else {
            dispatch(deselectAllUsersOnCurrPage(dataPerPage));
        }
    };

    const isAllRowsSelectedOnCurrPage: boolean = dataPerPage.every((user) =>
        selectedUsers.some((selectedUser) => selectedUser.id === user.id),
    );

    // Edit functionality
    const editBtnHandler = (userData: User) => {
        setEditableRowData(userData);
    };
    const saveBtnHandler = (updatedUserData: User) => {
        dispatch(editUserData(updatedUserData));
        setEditableRowData(null)
    };
    const cancelBtnHandler = () => {
        setEditableRowData(null)
    };

    return (
        <div className="rounded-md border border-gray-400">
            <table className="w-full ">
                <thead className="  ">
                    <tr className="border-b border-gray-400 ">
                        <td className="p-4">
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                checked={isAllRowsSelectedOnCurrPage}
                                onChange={selectAllRowsOnCurrPage}
                            />
                        </td>
                        {tableHeadData.map((ele) => (
                            <td className="p-4">{ele}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataPerPage.map((ele: User) => {
                        const isChecked: boolean = selectedUsers.find(
                            (item) => item.id === ele.id,
                        )
                            ? true
                            : false;
                        return (
                            <tr
                                key={ele.id}
                                className=" border-b border-gray-400 hover:bg-slate-100 "
                            >
                                {editableRowData?.id === ele?.id ? (
                                    <>
                                        <EditUser
                                            userData={editableRowData}
                                            saveBtnHandler={saveBtnHandler}
                                            cancelBtnHandler={cancelBtnHandler}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="cursor-pointer"
                                                checked={isChecked}
                                                onChange={(e) => onCheckedHandler(e, ele)}
                                            />
                                        </td>
                                        <td className="p-4">{ele.name}</td>
                                        <td className="p-4">{ele.email}</td>
                                        <td className="p-4">{ele.role}</td>
                                        <td className="p-4">
                                            <ActionBtn
                                                deleteBtnHandler={deleteUserBtnHandler}
                                                userData={ele}
                                                editBtnHandler={editBtnHandler}
                                            />
                                        </td>
                                    </>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
