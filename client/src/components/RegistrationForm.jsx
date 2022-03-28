import React,{useState,useEffect} from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    Alert,
  } from "react-bootstrap";
  import { useDispatch, useSelector } from "react-redux";
  import { newUserRegistration } from '../redux/actions/userRegisterAction';


// local state for managing initial register object state(fake one)
const initialState = {
    name: "Jack Sparrow",
    phone: "0410000000",
    email: "fakeemail@email.com",
    company: "Pirate",
    address: "Caribbean",
    password: "sfsd#3Dsg",
    confirmPass: "sfsd#3Dsg",
  };

  // force user to hard password initial state object
  const passVerificationError = {
    isLengthy: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    hasSpclChr: false,
    confirmPass: false,
  };
  
 export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState(initialState);
    const [passwordError, setPasswordError] = useState(passVerificationError);
  
    const { pending, status, message } = useSelector(
      (state) => state.registration
    );
  
    // side effect & component lifecycle
    useEffect(() => {}, [newUser]);
  
    // controlled input fields
    const handleOnChange = (e) => {
      const { name, value } = e.target;
  
      setNewUser({ ...newUser, [name]: value });
  
      if (name === "password") {
        const isLengthy = value.length > 8;
        const hasUpper = /[A-Z]/.test(value);
        const hasLower = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpclChr = /[@,#,$,%,&]/.test(value);
  
        setPasswordError({
          ...passwordError,
          isLengthy,
          hasUpper,
          hasLower,
          hasNumber,
          hasSpclChr,
        });
      }
  
      //password confirmation conditionally
      if (name === "confirmPass") {
        setPasswordError({
          ...passwordError,
          confirmPass: newUser.password === value,
        });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //  console.log(newUser);
      const { name, phone, email, company, address, password } = newUser;
  
      const newRegistration = {
        name,
        phone,
        email,
        company,
        address,
        password,
      };
      dispatch(newUserRegistration(newRegistration));
    };
  
    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{color:"whitesmoke"}}>User Registration</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            {message && (
              <Alert variant={status === true ? "success" : "danger"}>
                {message}
              </Alert>
            )}
          </Col>
        </Row>
  
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleOnChange}
                  placeholder="Your name"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleOnChange}
                  placeholder="Phone"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleOnChange}
                  placeholder="Enter email"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  value={newUser.company}
                  onChange={handleOnChange}
                  placeholder="Company name"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleOnChange}
                  placeholder="Full address"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleOnChange}
                  placeholder="Password"
                  required
                />
              </Form.Group>
  
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPass"
                  value={newUser.confirmPass}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
              <Form.Text>
                {!passwordError.confirmPass && (
                  <div className="text-warning mb-3">Password doesn't match!</div>
                )}
              </Form.Text>
  
              <ul className="mb-3">
                <li
                  className={
                    passwordError.isLengthy ? "text-info" : "text-warning"
                  }
                >
                  Min 8 characters
                </li>
                <li
                  className={
                    passwordError.hasUpper ? "text-info" : "text-warning"
                  }
                >
                  At least one upper case
                </li>
                <li
                  className={
                    passwordError.hasLower ? "text-info" : "text-warning"
                  }
                >
                  At least one lower case
                </li>
                <li
                  className={
                    passwordError.hasNumber ? "text-info" : "text-warning"
                  }
                >
                  At least one number
                </li>
                <li
                  className={
                    passwordError.hasSpclChr ? "text-info" : "text-warning"
                  }
                >
                  At least on of the special characters i.e @ # $ % &{" "}
                </li>
              </ul>
  
              <Button
                variant="primary"
                type="submit"
                disabled={Object.values(passwordError).includes(false)}
              >
                Submit
              </Button>
              {pending && <Spinner variant="info" animation="border" />}
            </Form>
          </Col>
        </Row>
        <Row className="py-4">
          <Col>
            Already have an account <a style={{color:'darkorange'}} href="/">Login Now</a>
          </Col>
        </Row>
      </Container>
    );
  };
  
