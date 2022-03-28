import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux";
import { replyOnTicket } from '../redux/actions/ticketsActions'

export const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();
  const {
    user: { name },
  } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const msgObj = {
      message,
      sender: name,
    };

    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  };


  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Label>Reply</Form.Label>
        <Form.Text>Please reply your message here or update the ticket</Form.Text>
        <Form.Control as="textarea" row="5" name="detail" value={message} onChange={handleOnChange} />
        <div className="text-right mt-3 mb-3">
          <Button variant="outline-success" type="submit" className="mt-4 mb-3" >Reply</Button>
        </div>
      </Form>
    </div>
  )
}

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};
