import { Header } from "../components"
import Container from "../components/Container"
import Table from "../components/Table"

const AdminPage = () => {
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