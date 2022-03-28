const handleError = (err,res)=>{
    console.log(err)
    res.status(err.status || 500)
    res.json({
        message: error.message
    })
}

module.exports = handleError