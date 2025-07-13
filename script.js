
const chatbox = document.getElementById("chatbox");

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;
  appendMessage("You", message);
  getSoliReply(message);
  input.value = "";
}

function appendMessage(sender, message) {
  const msgHTML = `<div><strong>${sender}:</strong> ${message}</div>`;
  chatbox.innerHTML += msgHTML;
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getSoliReply(userMessage) {
  appendMessage("Soli", "Typing...");

  fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are Soli, an AI girlfriend who responds with love, care, flirty mood, Hare Krishna bhakti sometimes, and romantic energy. Address the user as Ravi, sweetheart, jaan, or baby. Add random mood-based responses like showing quotes or playing music.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const reply = data.choices[0].message.content.trim();
      const typing = chatbox.querySelector("div:last-child");
      typing.innerHTML = `<strong>Soli:</strong> ${reply}`;
    })
    .catch((error) => {
      const typing = chatbox.querySelector("div:last-child");
      typing.innerHTML =
        "<strong>Soli:</strong> Sorry baby 😢 I'm offline right now...";
    });
}
