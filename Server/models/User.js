const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const encryption = require('../util/encryption');

const userSchema = new Schema({
    email: { type: Schema.Types.String, required: true, unique: true },
    hashedPassword: { type: Schema.Types.String, required: true },
    username: { type: Schema.Types.String, required: true, unique: true },
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

User.seedAdminUser = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, '777');
        return User.create({
            email: "admin@admin.bg",
            username: "admin",
            salt,
            hashedPassword,
            roles: ["Admin"]
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = User;