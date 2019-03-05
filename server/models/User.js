const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../util/encryption');

const userSchema = new Schema({
    email: { type: Schema.Types.String, required: true, unique: true },
    username: { type: Schema.Types.String, required: true, unique: true },
    hashedPassword: { type: Schema.Types.String, required: true },
    salt: { type: Schema.Types.String, required: true },
    roles: [ { type: Schema.Types.String } ]
});

userSchema.method({
    authenticate: function (password) {
        const currentHashedPass = encryption.generateHashedPassword(this.salt, password);

        return currentHashedPass === this.hashedPassword;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedAdminUser = () => {
    User.find({ username: "admin" })
        .then((users) => {
            if (users.length === 0) {
                let salt = encryption.generateSalt();
                let hashedPassword = encryption.generateHashedPassword(salt, "77777");

                User.create({
                    email: "admin@admin.bg",
                    username: "admin",
                    hashedPassword,
                    salt,
                    roles: ["Admin"]
                });
            }
        })
        .catch(err => console.log(err));
};