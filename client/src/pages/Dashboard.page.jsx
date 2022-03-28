import React, { useEffect } from 'react'
import { Button, Col, Row, Container } from 'react-bootstrap'
import '../styles/Dashboard.css'
import { TicketTable } from '../components/TicketTable'
// import tickets from '../data/DummyTickets.json'
import { PageBreadcrumb } from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTickets } from '../redux/actions/ticketsActions'


export const Dashboard = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.tickets);

    useEffect(() => {
        if (!tickets.length) {
            dispatch(fetchAllTickets());
        }
    }, [tickets, dispatch]);


    const pendingTickets = tickets.filter((row) => row.status !== "Closed");
    const totalTickets = tickets.length;

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Dashboard" />
                </Col>
            </Row>
            <Row>
                <Col className='text-center mt-5 mb-2'>
                    <Link to='/add-ticket'>
                        <Button variant='secondary' style={{ fontSize: "2rem", padding: "10px 30px" }}>Add New Ticket</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className='text-center mt-5 mb-2' variant="info">
                    <div className='text-style'>Total tickets: {totalTickets}</div>
                    <div className='text-style'>Pending tickets: {pendingTickets.length}</div>
                </Col>
            </Row>
            <Row>
                <Col className=' mt-2 text-style'>Recently Added Ticket</Col>
            </Row>
            <hr />
            <Row>
                <Col className='recent-ticket'><TicketTable tickets={tickets} /></Col>
            </Row>
        </Container>
    )
}
