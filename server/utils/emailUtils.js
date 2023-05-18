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

const sendEmail = async (email, password, compteNumber) => {
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

    const mailOptions = {
      from: "obole1@outlook.fr",
      to: email,
      subject: "Détails de votre compte bancaire Obole",
      text: `Cher(e) client(e),
  
  Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.
  
  Votre numéro de compte est le suivant : ${compteNumber}. Veuillez conserver cette information en lieu sûr et ne jamais la divulguer à quiconque.
  
  De plus, veuillez trouver ci-dessous votre mot de passe pour accéder à votre espace bancaire en ligne :
  
  Mot de passe : ${password}
  Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.
  
  Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.
  
  Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.
  
  Cordialement,
  
  L'équipe Obole`,
    };

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
