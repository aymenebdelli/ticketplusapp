import React, { useState } from 'react'
import '../styles/entry.style.css'
import { Container } from 'react-bootstrap'
import { LoginForm } from '../components/Login.comp'
import { ResetPassword } from '../components/ResetPassword'

export const Entry = () => {

  const [formLoad, setFormLoad] = useState('Login')

  const handleOnResetSubmit = e => {
    e.preventDefault()

  }

  const formSwitcher = formType => {
    setFormLoad(formType)
  }

  return (
    <div className='entry-page bg-secondary'>
      <Container id='log-form'>
        {formLoad === 'Login' && <LoginForm formSwitcher={formSwitcher} />}
        {formLoad === 'Reset' && <ResetPassword handleOnResetSubmit={handleOnResetSubmit} formSwitcher={formSwitcher} />}
      </Container>
    </div>
  )
}
