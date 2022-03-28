import React, { useState, useEffect } from "react";
import {
    Container, Row,
    Col,
    Form,
    Button, Alert, Spinner
} from "react-bootstrap"
import '../styles/AddTicketForm.css'
import { useDispatch, useSelector } from "react-redux";
import { openNewTicket } from "../redux/actions/addTicketAction";
import { shortText } from "../utils/validation";
import { restSuccessMSg } from "../redux/slices/addTicketSlice";
// import PropTypes from 'prop-types'

const initialFrmDt = {
    subject: "",
    issueDate: "",
    message: "",
};
const initialFrmError = {
    subject: false,
    issueDate: false,
    message: false,
};

export const AddTicketForm = () => {
    const dispatch = useDispatch();

    const {
        user: { name },
    } = useSelector((state) => state.user);

    const { isPending, error, successMsg } = useSelector(
        (state) => state.addTicket
    );

    const [formData, setFormData] = useState(initialFrmDt);
    const [frmDataError, setFrmDataError] = useState(initialFrmError);

    useEffect(() => {
        return () => {
            successMsg && dispatch(restSuccessMSg());
        };
    }, [dispatch, formData,frmDataError]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setFrmDataError(initialFrmError);

        const isSubjectValid = await shortText(formData.subject);

        setFrmDataError({
            ...initialFrmError,
            subject: !isSubjectValid,
        });

        dispatch(openNewTicket({ ...formData, sender: name }));
    };

    return (
        <Container className="mt-3 add-ticket">
            <Row>
                <h1 className="text-add text-center">Add New Ticket</h1>
                <hr />
                <div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMsg && <Alert variant="primary">{successMsg}</Alert>}
                    {isPending && <Spinner variant="primary" animation="border" />}
                </div>
                <Form autoComplete="off" onSubmit={handleOnSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Subject</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                name="subject"
                                value={formData.subject}
                                maxLength="100"
                                onChange={handleOnChange}
                                placeholder="Enter Subject"
                                className="bg-info"
                                required
                            />
                            <Form.Text className="text-danger">
                                {frmDataError.subject && "Subject is required!"}
                            </Form.Text>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm={3} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Issue found</Form.Label>
                        <Col sm={8}>
                            <Form.Control
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleOnChange}
                                className="bg-success"
                                required
                            /></Col>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Password</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="message"
                            value={formData.message}
                            rows="5"
                            onChange={handleOnChange}
                            required
                        />
                    </Form.Group>

                    <Button style={{ marginTop: '10px', marginBottom: '5px' }} type="submit" block variant='secondary'>Open Ticket</Button>
                </Form>
            </Row>
        </Container>
    )
}


// AddTicketForm.prototype = {
//     handleOnSubmit: PropTypes.func.isRequired,
//     handleOnChange: PropTypes.func.isRequired,
//     formData: PropTypes.object.isRequired,
//     errorData: PropTypes.object.isRequired
// }