import nodemailer, { TransportOptions } from "nodemailer";

import User from "../models/user.model";

const checkEmailExist = async (email: string) => {
  try {
    const user = await User.findOne({ "Information.email": email });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    throw new Error(`Error checking if email exists: ${err}`);
  }
};

const sendEmail = async (
  email: string,
  password: number,
  accountNumber: number,
  cardNumber: number,
  code: number,
  CCV: number,
  expirationDate: string,
  typeOfCard: string
) => {
  console.log(
    "sendEmail",
    email,
    password,
    accountNumber,
    cardNumber,
    code,
    CCV,
    expirationDate,
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
    } as TransportOptions);

    let mailOptions = {};

    if (typeOfCard === "newCard") {
      console.log("newCard");
      mailOptions = {
        from: "obole1@outlook.fr",
        to: email,
        subject: "Détails de votre nouvelle carte bancaire Obole",
        html: `<!DOCTYPE html>
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Obole - Confirmation Email</title>
          <style>
            body,
            body * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
        
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #272A31;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #F3F3FF;
            }
        
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
              color: #7089C2;
            }
        
            p {
              margin-bottom: 20px;
            }
        
            .card-info {
              background-color: #5F65AB;
              color: #F3F3FF;
              padding: 10px;
              margin-bottom: 20px;
            }
        
            .card-info p {
              margin-bottom: 10px;
            }
        
            .customer-service {
              background-color: #334777;
              color: #F3F3FF;
              padding: 10px;
            }
        
            .customer-service a {
              color: #F3F3FF;
              text-decoration: underline;
            }
          </style>
        </head>
        
        <body>
          <div className="container">
            <h1>Cher(e) client(e),</h1>
            <p>Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.</p>
            <div className="card-info">
              <p>Voici les informations pour votre nouvelle carte bancaire :</p>
              <p>- Numéro de carte : ${accountNumber}</p>
              <p>- Code de sécurité : ${code}</p>
              <p>- CCV : ${CCV}</p>
              <p>- Date d'expiration : ${expirationDate}</p>
            </div>
            <p>Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.</p>
            <p>Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.</p>
            <p>Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.</p>
            <p>Cordialement,</p>
            <p>L'équipe Obole</p>
            <div className="customer-service">
              <p>Pour toute assistance, veuillez contacter notre <a href="#">service clientèle</a>.</p>
            </div>
          </div>
        </body>
        
        </html>
        `,
      };
    } else if (typeOfCard === "newAccount") {
      console.log("newAccount");
      mailOptions = {
        from: "obole1@outlook.fr",
        to: email,
        subject: "Détails de votre nouveau compte bancaire Obole",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Obole - Confirmation Email</title>
          <style>
            body,
            body * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
        
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #272A31;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #F3F3FF;
            }
        
            h1 {
              font-size: 24px;
              margin-bottom: 20px;
              color: #7089C2;
            }
        
            p {
              margin-bottom: 20px;
            }
        
            .account-details {
              background-color: #5F65AB;
              color: #F3F3FF;
              padding: 10px;
              margin-bottom: 20px;
            }
        
            .account-details p {
              margin-bottom: 10px;
            }
        
            .card-info {
              background-color: #334777;
              color: #F3F3FF;
              padding: 10px;
              margin-bottom: 20px;
            }
        
            .card-info p {
              margin-bottom: 10px;
            }
        
            .customer-service {
              background-color: #272A31;
              color: #F3F3FF;
              padding: 10px;
            }
        
            .customer-service a {
              color: #F3F3FF;
              text-decoration: underline;
            }
          </style>
        </head>
        
        <body>
          <div className="container">
            <h1>Cher(e) client(e),</h1>
            <p>Nous tenons à vous remercier de votre confiance envers Obole, votre banque de confiance. Dans le cadre de notre engagement à fournir un service bancaire de qualité, nous avons le plaisir de vous envoyer les informations relatives à votre compte bancaire.</p>
            <div className="account-details">
              <p>Voici les détails de votre compte bancaire :</p>
              <p>- Numéro de compte : ${accountNumber}</p>
              <p>- Mot de passe : ${password}</p>
            </div>
            <div className="card-info">
              <p>Vos informations pour votre carte bancaire sont les suivantes :</p>
              <p>- Numéro de carte : ${cardNumber}</p>
              <p>- Code de sécurité : ${code}</p>
              <p>- CCV : ${CCV}</p>
              <p>- Date d'expiration : ${expirationDate}</p>
            </div>
            <p>Nous vous recommandons de changer régulièrement votre mot de passe pour garantir la sécurité de votre compte. Nous vous conseillons également de ne jamais divulguer votre mot de passe à quiconque.</p>
            <p>Si vous rencontrez des problèmes pour accéder à votre compte bancaire en ligne, n'hésitez pas à contacter notre service clientèle disponible 24 heures sur 24 et 7 jours sur 7.</p>
            <p>Nous espérons que vous trouverez ces informations utiles. Nous restons à votre disposition pour toute demande d'informations complémentaires.</p>
            <p>Cordialement,</p>
            <p>L'équipe Obole</p>
            <div className="customer-service">
              <p>Pour toute assistance, veuillez contacter notre <a href="#">service clientèle</a>.</p>
            </div>
          </div>
        </body>
        
        </html>
        `,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${(<any>info).response}`);
  } catch (err) {
    throw new Error(`Error sending email: ${err}`);
  }
};

export { checkEmailExist, sendEmail };
