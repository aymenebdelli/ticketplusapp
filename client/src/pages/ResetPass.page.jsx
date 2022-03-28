import React from 'react'
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ResetPassword } from '../components/ResetPassword';
import { UpdatePassword } from '../components/UpdatePassword';
import '../styles/ResetPass.css'

export const ResetPass = () => {
    const { showUpdatePassForm } = useSelector(state => state.password);

    return (
        <div className='reset-page bg-secondary'>
            <Container id='log-form'>
                {showUpdatePassForm ? <UpdatePassword/> : <ResetPassword/>}
                <div className="text-center">
                    <a href="/">Login Now</a>
                </div>
                <ResetPassword/>
            </Container>
        </div>
    )
}
