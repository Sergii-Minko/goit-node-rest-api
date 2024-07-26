import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { EMAIL_SECRET, MY_EMAIL } = process.env;

sgMail.setApiKey(EMAIL_SECRET);

export const sendEmail = async (data) => {
  const email = { ...data, from: MY_EMAIL };
  await sgMail.send(email);
  return true;
};
export default sendEmail;
