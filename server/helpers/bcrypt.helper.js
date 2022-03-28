const bcrypt = require('bcrypt')
const saltRounds = 10
const myPlaintextPassword = 's0/\/\P4$$w0rD'
const someOtherPlaintextPassword = 'not_bacon'


// hidden password
const hashPassword = (myPlaintextPassword) => {
    return new Promise(resolve => {
        resolve(bcrypt.hashSync(myPlaintextPassword, saltRounds))
    })
}

// built-in bcrypt for comparison
const comparePassword = (myPlaintextPassword, passFromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(myPlaintextPassword, passFromDb, (err, result) =>{
            if (err) reject(err)
            resolve(result)
        })
    })
}


module.exports = { hashPassword, comparePassword }