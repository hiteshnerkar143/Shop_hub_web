const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Email sending error:`, error.message);
    throw new Error("Failed to send email");
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOTPEmail = async (email, otp) => {
  const htmlContent = `
    <div style="font-family: Poppins, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
      <div style="background-color: white; border-radius: 10px; padding: 30px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h1 style="color: #333; margin-bottom: 20px;">🔐 Your OTP Verification Code</h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Enter this code to verify your email address:</p>
        
        <div style="background-color: #007bff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: white; letter-spacing: 3px; margin: 0; font-size: 32px;">${otp}</h2>
        </div>
        
        <p style="color: #999; font-size: 14px; margin-top: 20px;">⏰ This code expires in <strong>5 minutes</strong></p>
        <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
          If you didn't request this code, please ignore this email.
        </p>
      </div>
    </div>
  `;

  await sendEmail(email, "🔐 Your OTP Verification Code", htmlContent);
};

module.exports = {
  sendEmail,
  generateOTP,
  sendOTPEmail,
};
