import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// actions directly inside component
import { loginPending, loginSuccess, loginFail } from '../redux/slices/loginSlice'
import { userLogin } from '../api/userApi'
import { getUserProfile } from '../redux/actions/userAction'

// props coming from parent we can distract i use it for switch between reset login
export const LoginForm = ({ formSwitcher }) => {

    const dispatch = useDispatch()
    const history = useHistory()
    let location = useLocation();

    const { isLoading, isAuth, error } = useSelector((state) => state.login)
    let { from } = location.state || { from: { pathname: "/" } };


    useEffect(() => {
        sessionStorage.getItem("accessJWT") && history.replace(from)
    }, [history, isAuth])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleOnChange = e => {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break

            default:
                break
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return alert("Fill up the form!")
        }
        dispatch(loginPending());

        try {
            const isAuth = await userLogin({ email, password })
            // console.log(isAuth)
            if (isAuth.status === false) {
                return dispatch(loginFail(isAuth.message))
            }

            dispatch(loginSuccess());
            dispatch(getUserProfile());
            history.push('/dashboard');
        } catch (error) {
            dispatch(loginFail(error.message));
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Client Login</h1>
                    <hr />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form autoComplete="off" onSubmit={handleOnSubmit}>
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
                        <FormGroup>
                            <FormLabel>Password</FormLabel>
                            <FormControl
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="password"
                                required
                            />
                        </FormGroup>
                        <Button style={{ marginTop: '10px' }} type="submit">Login</Button>
                        {isLoading && <Spinner variant="success" animation="border" />}
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <a style={{ color: "white" }} href="/password-reset" >Forget Password?</a>
                </Col>
            </Row>
            <Row className="py-4">
                <Col>
                    Are you new here? <a style={{ color: "darkorange" }} href="/registration" >Register Now</a>
                </Col>
            </Row>
        </Container>
    )
}


// validation that props comes from parent is valid
LoginForm.propTypes = {
    // handleOnChange: PropTypes.func.isRequired,
    // handleOnSubmit: PropTypes.func.isRequired,
    formSwitcher: PropTypes.func.isRequired,
    // email: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired
}
