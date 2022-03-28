import React from 'react'
import { Table } from "react-bootstrap"
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const TicketTable = () => {

    const { searchTicketList, pending, error } = useSelector((state) => state.tickets)
    if (pending) return <h3>Loading...</h3>;
    if (error) return <h3>error</h3>;

    return (
        <Table striped bordered hover variant='dark'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Opened Date</th>
                </tr>
            </thead>
            <tbody>
                {searchTicketList.length ? (searchTicketList.map((row) =>
                (<tr key={row._id}>

                    <td>{row._id}</td>
                    <td>
                        <Link to={`/ticket/${row._id}`}>
                            {row.subject}</Link></td>
                    <td>{row.status}</td>
                    <td>{row.openAt && new Date(row.openAt).toLocaleString()}</td>
                </tr>
                ))) : (<tr>
                    <td colSpan="4" className="text-center" >There's No Ticket</td>
                </tr>)
                }
            </tbody>
        </Table>
    )
}


