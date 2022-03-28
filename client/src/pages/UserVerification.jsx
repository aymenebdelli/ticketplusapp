import React, { useEffect, useState } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'
import '../styles/UserVerification.css'
import { useParams } from "react-router-dom";
import { userRegistrationVerification } from "../api/userApi";

const initialResponse = {
    status: "",
    message: "",
};

    export const UserVerification = () => {
        const { _id, email } = useParams();
        const data = { _id, email };
    
        const [response, setResponse] = useState(initialResponse);
    
        //  verify user _id & api call local state without slice=>action...(redux-toolkit)
        useEffect(() => {
            const apiCall = async () => {
                const result = await userRegistrationVerification(data);
                setResponse(result);
            };
    
            !response.status && apiCall();
        }, [response]);


        return (
            <div className='verify-page bg-secondary'>
                <div className="mt-5">
                    <Container className='box-form mt-2'>
                        {!response.status && <Spinner variant="info" animation="border"/>}
                        {response.status && (
                            <Alert
                                variant={response.status === "success" ? "success" : "danger"}
                            >
                                {response.message}
                            </Alert>
                        )}
                    </Container>
                </div>
            </div>
        )
    }
