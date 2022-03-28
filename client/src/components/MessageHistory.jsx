import React from 'react'
import PropTypes from 'prop-types';
import '../styles/MessageHistory.css'

export const MessageHistory = ({ msg }) => {
    if (!msg) return null

    return msg.map((row, i) => (

        <div key={i} className="message-history">
            <div className="send">
                <div className="sender">{row.sender}</div>
                <div className="date">
                    {row.msgAt && new Date(row.msgAt).toLocaleString()}
                </div>
            </div>
            <div className="message">{row.message}</div>
        </div>
    ))

}

MessageHistory.prototypes = {
    msg: PropTypes.array.isRequired
}
