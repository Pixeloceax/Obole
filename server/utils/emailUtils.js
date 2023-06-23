const nodemailer = require("nodemailer");
const User = require("../db/userModel");

const checkEmailExists = async (email) => {
  try {
    const user = await User.findOne({ "Information.email": email });
    if (user) {
      return true; // email already exists in the database
    } else {
      return false; // email does not exist in the database
    }
  } catch (error) {
    throw new Error(`Error checking if email exists: ${error}`);
  }
};

const sendEmail = async (
  email,
  password,
  compteNumber,
  carteNumber,
  code,
  CCV,
  dateExpiration,
  typeOfCard
) => {
  console.log(
    "sendEmail",
    email,
    password,
    compteNumber,
    carteNumber,
    code,
    CCV,
    dateExpiration,
    typeOfCard
  );
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      auth: {
        user: "obole1@outlook.fr",
        pass: "Oboleaxelcolas",
      },
    });
    let mailOptions = {};

    if (typeOfCard == "newCard") {
      console.log("newCard");
      mailOptions = {
        from: "obole1@outlook.fr",
        to: email,
        subject: "Détails de votre nouvelle carte bancaire Obole",
        text: `Cher(e) client(e),

        Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.

        Voici les informations pour votre nouvelle carte bancaire :

        - Numéro de carte : ${carteNumber}
        - Code de sécurité : ${code}
        - CCV : ${CCV}
        - Date d'expiration : ${dateExpiration}

        Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.

        Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.

        Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.

        Cordialement,

        L'équipe Obole`,
      };
    } else if (typeOfCard == "newUser") {
      console.log("newUser");
      mailOptions = {
        from: "obole1@outlook.fr",
        to: email,
        subject: "Détails de votre compte bancaire Obole",
        text: `Cher(e) client(e),

        Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.
        
        Voici les détails de votre compte bancaire :
        
        - Numéro de compte : ${compteNumber}
        - Mot de passe : ${password}
        
        Vos informations pour votre carte bancaire sont les suivantes :
        
        - Numéro de carte : ${carteNumber}
        - Code de sécurité : ${code}
        - CCV : ${CCV}
        - Date d'expiration : ${dateExpiration}
        
        Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.
        
        Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.
        
        Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.
        
        Cordialement,
        
        L'équipe Obole`,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    throw new Error(`Error sending email: ${error}`);
  }
};

module.exports = {
  checkEmailExists,
  sendEmail,
};
