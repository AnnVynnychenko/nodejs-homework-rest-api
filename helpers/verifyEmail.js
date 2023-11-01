const { BASE_URL } = process.env;

const generateVerifyEmail = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };
};

module.exports = generateVerifyEmail;
