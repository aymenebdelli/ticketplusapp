import React from 'react'
import { Form, Row, Col } from "react-bootstrap"
import { useDispatch } from 'react-redux'
import { filterSearchTicket } from '../redux/actions/ticketsActions'

export const SearchForm = () => {

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { value } = e.target;

        dispatch(filterSearchTicket(value));
    };

    return (
        <div>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column sm="3">Search:</Form.Label>
                    <Col sm="6">
                        <Form.Control
                            name="searchStr"
                            onChange={handleOnChange}
                            // value={str}
                            placeholder="Search..."
                        />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}


// SearchForm.propTypes = {
//     handleOnChange: PropTypes.func.isRequired,
//     str: PropTypes.string.isRequired
// }