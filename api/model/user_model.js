const mongoose = require('mongoose');

const image = 'https://robohash.org/admin_default_image?set=set4';

const userSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    username: { type: String, required: true, lowercase: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    phone_num: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    image: { type: String, default: image },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;