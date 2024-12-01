const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, enum: ['employee', 'admin'], required: true },
    fullName: { type: String, required: true }, 
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);


// {
//   "email": "testuser@example.com",
//   "password": "12345678"
// }

// {
//   "email": "testuser1@example.com",
//   "password": "password123",
//   "type": "employee",
//   "fullName": "Test User"
// }

// {
//   "email": "admin@example.com",
//   "password": "admin123",
//   "type": "admin",
//   "fullName": "Admin User"
// }