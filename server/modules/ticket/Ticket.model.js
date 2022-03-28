
const { TicketSchema } = require('./Ticket.schema')

const insertTicket = (ticketObj) => {
    return new Promise((resolve, reject) => {


        try {
            TicketSchema(ticketObj)
                .save()
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

const getTickets = (clientId) => {
    return new Promise((resolve, reject) => {


        try {
            TicketSchema
                .find({ clientId })
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

const getTicketsById = (_id, clientId) => {
    return new Promise((resolve, reject) => {


        try {
            TicketSchema
                .find({ _id, clientId })
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

const updateClientReply = (_id, message, sender) => {
    return new Promise((resolve, reject) => {

        try {
            TicketSchema
                .findOneAndUpdate({ _id }, {
                    status: "Pending Operator Response", $push: {
                        conversations: { message, sender }
                    }
                }, { new: true })
                .then(data => {
                    resolve(data)
                })
                .catch(err => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

const updateStatusClose = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndUpdate(
                { _id, clientId },
                {
                    status: "Closed",
                },
                { new: true }
            )
                .then((data) => resolve(data))
                .catch((err) => reject(err))
        } catch (err) {
            reject(err)
        }
    })
}

const deleteTicket = ({ _id, clientId }) => {
    return new Promise((resolve, reject) => {
        try {
            TicketSchema.findOneAndDelete({ _id, clientId })
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        } catch (err) {
            reject(err)
        }
    })
}


module.exports = { insertTicket, getTickets, getTicketsById, updateClientReply, updateStatusClose, deleteTicket } 