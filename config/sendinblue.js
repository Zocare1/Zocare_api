var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "api key to be added later";

module.exports.sendEmail = function sendEmail({
  email,
  name,
  subject,
  content,
}) {
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    sender: { email: "mehtaparivesh@gmail.com" },
    to: [
      {
        email: email,
        name: name,
      },
    ],
    subject: subject,
    textContent: content,
  };
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("API called successfully. Returned data: " + data);
      return data;
    },
    function (error) {
      console.error(error);
      return null;
    }
  );
};
