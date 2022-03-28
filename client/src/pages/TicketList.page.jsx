import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { PageBreadcrumb } from '../components/Breadcrumb'
import { SearchForm } from '../components/SearchForm'
import { TicketTable } from '../components/TicketTable'
// import tickets from "../data/DummyTickets.json"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchAllTickets } from '../redux/actions/ticketsActions'

export const TicketList = () => {
    const dispatch = useDispatch()

    // const [str, setStr] = useState("")

    useEffect(() => {
        dispatch(fetchAllTickets());
    }, [dispatch])

    // const handleOnChange = (e) => {
    //     const { value } = e.target
    //     setStr(value)
    //     searchTicket(value)
    // }

    // const searchTicket = (sttr) => {
    //     const displayTickets = tickets.filter((row) => row.subject.toLowerCase().includes(sttr.toLowerCase()))

    // }

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket List" />
                </Col>
            </Row>
            <Row className="mt-4">
                <Col sm="5">
                    <Link to='/add-ticket'>
                        <Button variant='primary'>Add New Ticket</Button>
                    </Link>
                </Col>
                <Col className="text-right">
                    <SearchForm />
                </Col>
            </Row>
            <hr />

            <Row>
                <Col>
                    <TicketTable />
                </Col>
            </Row>

        </Container>
    )
}
