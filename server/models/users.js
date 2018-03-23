const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: String,
    password: String
});

UserSchema.methods.generateHash = function (password)  {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.comparePassword = function (password) {
    if(this.password != null){
        return bcrypt.compareSync(password, this.password);
    } else {
        return false;
    }
};

module.exports = mongoose.model('users', UserSchema);