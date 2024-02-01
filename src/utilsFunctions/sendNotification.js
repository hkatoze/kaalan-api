const sendPushNotification = async (
  firebase,
  registrationTokens,
  title,
  body
) => {
  const message = {
    data: {
      title,
      body,
    },
    tokens: registrationTokens,
  };

  try {
    const response = await firebase.messaging().sendMulticast(message);
    console.log(`${response.successCount} notifications envoyées avec succès.`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification push:", error);
    throw error;
  }
};
