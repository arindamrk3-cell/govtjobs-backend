//const fetch = require("node-fetch");

const sendPush = async (tokens, title, body) => {
  
    const messages = tokens.map(token => ({
      to: token,
      sound: "default",
      title,
      body
    }));
  try {

    const res = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(messages)
    });

    const data = await res.json();
    console.log("Push response:", data);

  } catch (err) {
    console.log("Push error:", err.message);
  }
};

module.exports = sendPush;
