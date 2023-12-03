import { Header } from "../components";
import Container from "../components/Container";
import Table from "../components/Table";

import { fetchUserData } from "../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const AdminPage = () => {
    const [currPage, setCurrPage] = useState<number>(1);
    const dispatch = useAppDispatch();

    const { filteredUsersData, isLoading, error } = useAppSelector(
        (state) => state.users,
    );
    const currPageItem: number = 10;
    const pages: number[] = [];
    for (
        let i = 1;
        i <= Math.ceil(filteredUsersData.length / currPageItem);
        i++
    ) {
        pages.push(i);
    }
    const startIndex: number = (currPage - 1) * currPageItem;
    const lastIndex: number = startIndex + currPageItem;
    const dataPerPage: User[] = filteredUsersData.slice(startIndex, lastIndex);

    const pageHandler = (page: number) => {
        if (page !== currPage && page > 0 && page <= pages.length) {
            setCurrPage(page);
        }
    };

    useEffect(() => {
        dispatch(fetchUserData());
    }, []);

    useEffect(() => {
        setCurrPage(1);
    }, [filteredUsersData]);

    return (
        <Container>
            <div>
                <Header />
            </div>
            {isLoading ? (
                <h1 className="text-center text-xl font-semibold ">Loading..</h1>
            ) : (
                <>
                    {error ? (
                        <h3>{error}</h3>
                    ) : (
                        <>
                            <div>
                                <Table dataPerPage={dataPerPage} />
                            </div>
                            <Pagination
                                pages={pages}
                                currPage={currPage}
                                pageHandler={pageHandler}
                            />
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default AdminPage;
