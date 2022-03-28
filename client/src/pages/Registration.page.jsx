import React from 'react'
import '../styles/Registration.css'
import { Container } from 'react-bootstrap'
import { RegistrationForm } from '../components/RegistrationForm'

export const Registration = () => {
    return (
        <div className='registration-page bg-secondary'>
                <Container className='box-form mt-3'>
                    <RegistrationForm />
                </Container>
        </div>
    )
}

