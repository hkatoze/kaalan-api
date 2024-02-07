const nodemailer = require("nodemailer");

async function sendVerificationCode(email, verificationCode) {
  // Configuration du transporteur SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "kaalan226@outlook.com",
      pass: "Kind@1404",
    },
  });

  // Contenu de l'e-mail
  const mailOptions = {
    from: "kaalan226@outlook.com",
    to: email,
    subject: "Code de vérification pour réinitialisation du mot de passe",
    html: `<!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Réinitialisation du mot de passe</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        img {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
        }
        .verification-code {
          background-color: #f0f0f0;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <img src="https://ucarecdn.com/402899d3-ba8e-4053-a318-1cd9fe3b440c/kaalanallremovebgpreview.png" alt="Kaalan logo">
        <h2>Réinitialisation du mot de passe</h2>
        <p>Votre code de vérification pour réinitialiser votre mot de passe est :</p>
        <p class="verification-code">${verificationCode}</p>
        <p>Ce code est valable pendant 24 heures.</p>
        <p>Si vous ne reconnaissez pas avoir lancer un processus de réinitialisation du mot de passe de votre compte sur Kaalan, vous pouvez ignorer ce message.</p>
      </div>
    </body>
    </html>
    `,
  };

  // Envoi de l'e-mail

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("E-mail envoyé avec succès.");
    }
  });
}

module.exports = { sendVerificationCode };
