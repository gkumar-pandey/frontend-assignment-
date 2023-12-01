
import { MdOutlineDelete } from "react-icons/md";


const Search = () => {
    return (
        <div className='flex items-center justify-between  p-2 ' >
            <div>
                <input className=" border border-gray-800 rounded-md px-2 py-1 focus:outline-none " placeholder="Search..." />
            </div>
            <div>
                <button className='bg-red-600 border text-white text-2xl p-2  rounded-md' >
                    <MdOutlineDelete />
                </button>
            </div>
        </div>
    )
}

export default Search