

import { useAppDispatch, useAppSelector } from "../store/hook"
import { deleteUser } from "../store/slice/userSlice";
import ActionBtn from "./ActionBtn"



const tableHeadData: string[] = ['Name', "Email", "Role", "Action"]

const Table = () => {
    const { filteredUsersData, isLoading } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch()

    const deleteUserBtnHandler = (userId: number) => {
        dispatch(deleteUser(userId))
    }


    return (
        <div className="border border-gray-400 rounded-md  " >
            <table className="w-full " >
                <thead className="  " >
                    <tr className="border-b border-gray-400 " >
                        <td className="p-4" >
                            <input type="checkbox" />
                        </td>
                        {
                            tableHeadData.map((ele) => <td className="p-4" >{ele}</td>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredUsersData.map((ele) => <tr key={ele.id} className=" border-b border-gray-400 hover:bg-slate-100 " >
                            <td className="p-4" >
                                <input type="checkbox" />
                            </td>
                            <td className="p-4" >{ele.name}</td>
                            <td className="p-4" >{ele.email}</td>
                            <td className="p-4" >{ele.role}</td>
                            <td className="p-4" >
                                <ActionBtn deleteBtnHandler={deleteUserBtnHandler} userId={ele.id} />
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table