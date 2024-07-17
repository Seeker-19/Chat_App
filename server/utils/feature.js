import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token",token,{
      httpOnly: true,
      secure:true,
      maxAge: 20 * 60 * 1000,
    })
    .json({
      success: true,
      message: message,
    
    });
};
