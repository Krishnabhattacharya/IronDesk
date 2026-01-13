const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'HR', 'ENGINEER', 'TECHNICIAN'],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    approvals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Approval',
      },
    ],
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Approval',
      },
    ],
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password,
        delete userObject.tokens
    return userObject;
}




const User = mongoose.model("User", userSchema);
export default User;