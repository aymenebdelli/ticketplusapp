const express = require('express')
const router = express.Router()
const { insertTicket, getTickets, getTicketsById, updateClientReply, updateStatusClose, deleteTicket } = require('../modules/ticket/Ticket.model')
const { userAuthorization } = require('../middlewares/autorization')
const { createNewTicketValidation, replyTicketMessageValidation } = require('../middlewares/validation')


router.all('/', (req, res, next) => {
    // res.json({message:'return from ticket router'})
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
})

// create the new ticket
router.post('/', createNewTicketValidation, userAuthorization, async (req, res) => {
    // console.log(req.headers)
    try {
        const { subject, sender, message } = req.body

        const userId = req.userId
        const ticketObj = {
            clientId: userId,
            subject,
            conversations: [
                {
                    sender,
                    message
                }
            ]
        }
        const result = await insertTicket(ticketObj)
        // console.log(result)
        if (result._id) {
            return res.status(200).json({ status: true, message: "new ticket has been created!" })
        }

        result.json({ status: false, message: "enable to create ticket,Please try again later" })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }

})

// get all ticket for a specific user
router.get('/', userAuthorization, async (req, res) => {
    try {
        const userId = req.userId

        const result = await getTickets(userId)

        if (result.length) {
            return res.status(200).json({ status: true, result })
        }

    } catch (err) {
        res.status(500).json({ status: false, message: err.message })
    }
})

// get a ticket by id 
router.get('/:_id', userAuthorization, async (req, res) => {
    // console.log(req.params) 
    try {
        const { _id } = req.params
        const clientId = req.userId
        const result = await getTicketsById(_id, clientId)


        return res.status(200).json({ status: true, result:result })


    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})

// update reply message from client
router.put('/:_id', replyTicketMessageValidation, userAuthorization, async (req, res) => {

    try {
        const { message, sender } = req.body
        const { _id } = req.params
        const clientId = req.userId


        const result = await updateClientReply(_id, message, sender)

        if (result._id) {
            return res.status(200).json({ status: true, message: "your message updated" })
        }
        res.json({
            status: false,
            message: "Unable to update your message please try again later",
        })

    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})

// ticket to close
router.patch('/close-ticket/:_id', userAuthorization, async (req, res) => {

    try {

        const { _id } = req.params
        const clientId = req.userId


        const result = await updateStatusClose({ _id, clientId })

        if (result._id) {
            return res.status(200).json({
                status: true,
                message: "The ticket has been closed",
            });
        }
        res.json({
            status: false,
            message: "Unable to update the ticket",
        });
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})

// Delete a ticket
router.delete("/:_id", userAuthorization, async (req, res) => {
    try {
        const { _id } = req.params;
        const clientId = req.userId;

        const result = await deleteTicket({ _id, clientId })
        // console.log(result)
        return res.status(200).json({
            status: true,
            message: "The ticket has been deleted",
        })
    } catch (err) {
        res.json({ status: false, message: err.message })
    }
})



module.exports = router