const { token } = require("morgan")
const { UserSchema } = require('./User.schema')

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj).save()
      .then(data => resolve(data))
      .catch(err => reject(err))
  })

}

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (!email) return false

    try {
      UserSchema.findOne({ email }, (err, data) => {
        if (err) {
          console.log(err)
          reject(err)
        }
        resolve(data)
      });
    } catch (err) {
      reject(err)
    }
  })
}


const getUserById = (_id) => {
  return new Promise((resolve, reject) => {
    if (!_id) return false

    try {
      UserSchema.findOne({ _id }, (error, data) => {
        if (error) {
          console.log(error)
          reject(error)
        }
        resolve(data)
      })
    } catch (error) {
      reject(error)
    }
  })
}


const storeUserRefreshJWT = (_id, token) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate({ _id },
        { $set: { "refreshJWT.token": token, "refreshJWT.addTime": Date.now() } },
        { new: true }
      ).then((data) => resolve(data))
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    } catch (err) {
      console.log(err)
      reject(err)
    }
  })
}

const updatePassword = (email, newhashedPass) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email: email },
        {
          $set: { password: newhashedPass },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

// for method path in user.router folder registration verify
const verifyUser = (_id, email) => {
  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { _id, email, isVerified: false },
        {
          $set: { isVerified: true },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((err) => {
          console.log(err.message);
          reject(err);
        });
    } catch (err) {
      console.log(err.message)
      reject(err)
    }
  })
}

module.exports = { insertUser, getUserByEmail, storeUserRefreshJWT, getUserById, updatePassword, verifyUser }