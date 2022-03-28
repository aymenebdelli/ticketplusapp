import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap'
import '../styles/Ticket.css'
import { PageBreadcrumb } from '../components/Breadcrumb'
import { MessageHistory } from '../components/MessageHistory'
import { UpdateTicket } from '../components/UpdateTicket'
// import tickets from '../data/DummyTickets.json'
import { useParams } from 'react-router-dom'
import { fetchSingleTicket, closeTicket } from '../redux/actions/ticketsActions'
import { resetResponseMsg } from "../redux/slices/ticketSlice";
import { useDispatch, useSelector } from 'react-redux';

// const ticket = tickets[0]
export const Ticket = () => {
    const { tId } = useParams()

    const dispatch = useDispatch();
    const {
        pending,
        error,
        selectedTicket,
        replyMsg,
        replyTicketError,
    } = useSelector((state) => state.tickets);

    useEffect(() => {
        dispatch(fetchSingleTicket(tId));

        return () => {
            (replyMsg || replyTicketError) && dispatch(resetResponseMsg());
        };
    }, [tId, dispatch, replyMsg, replyTicketError]);

    return (
        <Container>
            <Row>
                <Col>
                    <PageBreadcrumb page="Ticket" />
                </Col>
            </Row>
            <Row>
                <Col>
                    {pending && <Spinner variant="primary" animation="border" />}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {replyTicketError && (
                        <Alert variant="danger">{replyTicketError}</Alert>
                    )}
                    {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
                </Col>
            </Row>
            <Row>
                <Col className="ticket-info">
                    {/* {tId} */}
                    <div className="subject ">Subject: {selectedTicket.subject}</div>
                    <div className="date">Ticket Date: {selectedTicket.openAt && new Date(selectedTicket.openAt).toLocaleString()}</div>
                    <div className="status">Status: {selectedTicket.status}</div>
                </Col>

                <Col style={{ textAlign: "right", marginTop: "12px" }}>
                    <Button variant="outline-danger" onClick={() => dispatch(closeTicket(tId))}
                        disabled={selectedTicket.status === "Closed"}>Close Ticket</Button>
                </Col>
            </Row>
            <Row style={{ textAlign: "left", marginTop: "4" }}>
                <Col>
                    {selectedTicket.conversations && <MessageHistory msg={selectedTicket.conversations} />}
                </Col>
            </Row>
            <hr />
            <Row >
                <Col>
                    <UpdateTicket _id={tId} />
                </Col>
            </Row>

        </Container>
    )
}
