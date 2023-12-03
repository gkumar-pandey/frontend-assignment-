import { useState, FC } from 'react'

interface User {
    id: number,
    name: string,
    email: string,
    role: string
}

interface EditUserProps {
    userData: User,
    saveBtnHandler: (updatedUserData: User) => void;
    cancelBtnHandler: () => void;
}
const EditUser: FC<EditUserProps> = ({ userData, saveBtnHandler, cancelBtnHandler }) => {
    const [editableUser, setEditableUser] = useState<User>({ id: userData.id, name: userData.name, email: userData.email, role: userData.role })



    const onChangeHandler = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setEditableUser((pre) => ({ ...pre, [name]: value }))
    }



    return (
        <>
            <td className="p-4" >
                <input type="checkbox" />
            </td>
            <td className="p-4" >
                <input className='focus:outline-none px-1' placeholder='name' name='name' type='text' value={editableUser?.name} onChange={onChangeHandler} />
            </td>
            <td className="p-4" >
                <input className='focus:outline-none px-1' placeholder='email' name='email' type='email' value={editableUser?.email} onChange={onChangeHandler} />
            </td>
            <td className="p-4" >
                <select name='role' value={editableUser?.role} onChange={onChangeHandler} className='cursor-pointer' >
                    <option value={'admin'} >Admin</option>
                    <option value={'member'} >member</option>
                </select>
            </td>
            <td className="p-4 gap-2 flex " >
                <button onClick={() => saveBtnHandler(editableUser)} className='px-2 py-1 border border-green-600 hover:bg-green-600 hover:text-white text-green-600 rounded-md cursor-pointer' >save</button>
                <button onClick={() => cancelBtnHandler()} className='px-2 py-1 border border-red-700 text-red-600 cursor-pointer rounded-md hover:bg-red-600 hover:text-white ' >cancel</button>
            </td>
        </>
    )
}

export default EditUser