import { FC, ReactNode } from "react"

interface containerProps {
    children: ReactNode
}

const Container: FC<containerProps> = ({ children }) => {
    return (
        <div className="max-w-[1440px] m-auto " >
            {children}
        </div>
    )
}

export default Container