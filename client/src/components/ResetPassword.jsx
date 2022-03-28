import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendPasswordResetOtp } from "../redux/actions/resetPassAction";
import PropTypes from 'prop-types'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Alert,
    FormLabel,
    FormControl,
    FormGroup,
} from "react-bootstrap";

// props coming from parent we can distract
export const ResetPassword = () => {
    const dispatch = useDispatch();

	const [email, setEmail] = useState("");
	const { isLoading, status, message } = useSelector(state => state.password);

	const handleOnResetSubmit = e => {
		e.preventDefault();

		dispatch(sendPasswordResetOtp(email));
	};

	const handleOnChange = e => {
		const { value } = e.target;
		setEmail(value);
	};

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Reset Password</h1>
                    <hr />
                    {message && (
						<Alert variant={status === true ? "success" : "danger"}>
							{message}
						</Alert>
					)}

					{isLoading && <Spinner variant="primary" animation="border" />}

                    <Form onSubmit={handleOnResetSubmit}>
                        <FormGroup>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleOnChange}
                                placeholder="Enter Email"
                                required
                            />
                        </FormGroup>
                        <Button style={{marginTop:'10px'}  } type="submit">Reset Password</Button>
                    </Form>
                    <hr/>
                </Col>
            </Row>
            {/* <Row>
                <Col>
                <a style={{color:"white"}} href="/">Logging Now</a>
                </Col>
            </Row> */}
        </Container>
    )
}


// validation that props comes from parent is valid
// ResetPassword.propTypes={
    // handleOnChange: PropTypes.func.isRequired,
    // handleOnResetSubmit: PropTypes.func.isRequired,
    // formSwitcher: PropTypes.func.isRequired,
    // email: PropTypes.string.isRequired,
// }
