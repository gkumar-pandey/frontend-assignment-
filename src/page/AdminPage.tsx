import { Header } from "../components"
import Container from "../components/Container"
import Table from "../components/Table"

import { fetchUserData } from "../store/slice/userSlice"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { useEffect } from "react"

const AdminPage = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])



    return (
        <Container>
            <div>
                <Header />
            </div>
            <div>
                <Table />
            </div>
        </Container>
    )
}

export default AdminPage