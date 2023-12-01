import Search from "./Search";

const Header = () => {
    return (
        <div>
            <h2 className=" p-4 text-center text-2xl font-medium">Admin Dashboard</h2>
            <div>
                <Search />
            </div>
        </div>
    );
};

export default Header;
