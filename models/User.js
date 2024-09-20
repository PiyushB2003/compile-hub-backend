import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    default: null,
  },
  avatar: {
    type: String
  }
}, {
  timestamps: true,
});

// Export the model
const User = mongoose.model('User', userSchema);

export default User;
