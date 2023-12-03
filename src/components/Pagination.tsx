import { FC } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { useAppSelector } from '../store/hook'

interface PaginationProps {
    pages: number[],
    currPage: number,
    pageHandler: (page: number) => void
}



const Pagination: FC<PaginationProps> = ({ pages, currPage, pageHandler }) => {
    const { data, selectedUsers } = useAppSelector((state) => state.users)

    return (
        <div className='flex items-center justify-between py-2 ' >
            <div>
                <p>{selectedUsers.length} of {data.length} rows selected</p>
            </div>
            <div className='flex items-center justify-center gap-3 ' >
                <p>
                    Page {currPage} of {pages.length}
                </p>
                <div className="flex items-center gap-1 ">
                    <button
                        onClick={() => pageHandler(currPage - 1)}
                        className="p-1 text-xl border border-gray-400 rounded-md "
                    >
                        <MdKeyboardArrowLeft className="arrow_icon " />
                    </button>
                    {pages.map((item, idx) => (
                        <button
                            key={idx}
                            onClick={() => pageHandler(item)}
                            className={`px-2 py-1 flex items-center justify-center border border-gray-400 rounded-md ${currPage === item && " font-bold "} `}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        className="p-1 text-xl border border-gray-400 rounded-md"
                        onClick={() => pageHandler(currPage + 1)}
                    >
                        <MdKeyboardArrowRight className="arrow_icon" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pagination