const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route POST api/auth/login
// @desc login user
// @access Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });

    //validate password
    if (!user) {
      return res.status(401).json({ message: 'User doesnot exist' });
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        res
          .status(200)
          .json({ message: 'Login Successfully', token: user._id, user: user });
      } else {
        return res.status(400).json({ message: 'Invalid Credentials' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET api/auth/:token
// @desc get loggedin user
// @access Public
exports.getLoggedInUser = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).json({ message: 'Token required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: 'User doesnot exist' });
    }
    // Login successful, write token, and send back user
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @route POST api/auth/add
// @desc Add a new user
// @access Public
exports.register = async (req, res) => {
  try {
    const {
      userName,
      password,
      email,
      fullName,
      country,
      city,
      company,
      role,
      Client,
      title,
    } = req.body;
    if (!userName || !fullName || !password) {
      return res.status(401).json({
        message: 'Please Enter All Fields',
      });
    }
    const useremail = await User.findOne({ userName });
    if (useremail) {
      return res.status(401).json({
        message:
          'The username you have entered is already associated with another account.',
      });
    }
    const newUser = new User({
      userName,
      password,
      fullName,
      email,
      Client,
      country,
      city,
      company,
      role,
      title,
    });
    // CREATE HASH
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.status(401).json({
            message: err,
          });
        }
        newUser.password = hash;
        await newUser.save();
        res.status(200).json({
          message: 'Register Successfully.',
        });
      });
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
// exports.forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user)
//       return res.status(401).json({
//         message:
//           "The email address " +
//           email +
//           " is not associated with any account. Double-check your email address and try again.",
//       });

//     //Generate and set password reset token
//     user.generatePasswordReset();

//     // Save the updated user object
//     await user.save();

//     // send email
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//     let link = process.env.APPURL + "/resetpassword/" + user.resetPasswordToken;
//     const date = new Date().toISOString().split("T")[0];
//     const time = new Date().toISOString().split("T")[1];
//     const msg = {
//       to: user.email,
//       from: process.env.FROM_EMAIL,
//       subject: "RESET PASSWORD",
//       html: `
//       <body style="background-color:#e2e1e0;font-family: Open Sans, sans-serif;font-size:100%;font-weight:400;line-height:1.4;color:#000;">
//   <table style="max-width:670px;margin:50px auto 10px;background-color:#fff;padding:50px;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-moz-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24); border-top: solid 10px #ff4500;">
//     <thead>
//       <tr>
//         <th style="text-align:left;"><img style="max-width: 150px;" src="https://cleverteq-media.s3.amazonaws.com/favicon-white-transparent.png" alt="Cleverteq"></th>
//         <th style="text-align:right;font-weight:400;">${date}  ${time} </th>
//       </tr>
//     </thead>
//     <tbody>
//       <tr>
//         <td style="height:35px;"></td>
//       </tr>
//       <tr>
//         <td style="width:50%;padding:20px;vertical-align:top">
//           <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px"></span>
//           Hi ${user.userName}
//           </p>
//           <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;"></span>
//           A request has been received to change the password for your Cleverteq account.
//           </p>
//           <p style="margin:0 0 10px 0;padding:0;font-size:14px;"><span style="display:block;font-weight:bold;font-size:13px;"></span> <br>
//           <a style="background:#171717;color:#fff;padding:8px;15px" href="${link}">Verify Account</a><br><br>
//           If you did not initiate this request, Igonre it.
//           <h5 style="margin-bottom:0;margin-top:20px;">Thank you</h5>

//           </p>
//         </td>

//       </tr>

//     </tbody>
//     <tfooter>
//       <tr>
//         <td colspan="2" style="font-size:14px;padding:50px 15px 0 15px;">
//           <strong style="display:block;margin:0 0 10px 0;">Regards</strong> Cleverteq <br> Gorubathan, Pin/Zip - 735221, Darjeeling, West bengal, India<br><br>
//           <b>Phone:</b> 00995555511<br>
//           <b>Email:</b> Cleverteq@cleverteq.in
//         </td>
//       </tr>
//     </tfooter>
//   </table>
// </body>
// `,
//     };
//     sgMail.send(msg);
//     res.status(200).json({
//       message: "A reset email has been sent to " + user.email + ".",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const user = await User.findOne({
//       resetPasswordToken: token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user)
//       return res
//         .status(401)
//         .json({ message: "Password reset token is invalid or has expired." });

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(req.body.password, salt, (err, hash) => {
//         if (err) {
//           return res.status(401).json({
//             message: err,
//           });
//         }
//         req.body.password = hash;
//       });
//     });
//     //Set the new password
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     // Save the updated user object
//     await user.save();

//     res.status(200).json({
//       message: "Your password updated successfully. Login to proceed",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
