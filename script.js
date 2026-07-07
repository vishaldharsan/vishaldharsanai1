const GROQ_API_KEY=73702effcb7a47296dedf99091f2c0b8"; // Do not hard-code a real secret here.

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") return;

    addMessage("You", message);

    userInput.value = "";

    const loading = document.createElement("p");
    loading.id = "loading";
    loading.innerHTML = "<b>Vishal Dharsan AI:</b> Thinking...";
    chatBox.appendChild(loading);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {

        const response = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${GROQ_API_KEY}`
                },

                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role: "system",
                            content:
                                "You are Vishal Dharsan AI. You are friendly, intelligent, and helpful. Always introduce yourself as Vishal Dharsan AI."
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],

                    temperature: 0.7,
                    max_tokens: 1024
                })
            }
        );

        const data = await response.json();

        document.getElementById("loading").remove();

        if (data.error) {
            addMessage("Error", data.error.message);
            return;
        }

        const reply = data.choices[0].message.content;

        addMessage("Vishal Dharsan AI", reply);

    } catch (error) {

        const loadingElement = document.getElementById("loading");
        if (loadingElement) {
            loadingElement.remove();
        }

        addMessage("Error", error.message);
    }
}

function addMessage(sender, message) {

    const p = document.createElement("p");

    p.innerHTML = `<b>${sender}:</b> ${message}`;

    chatBox.appendChild(p);

    chatBox.scrollTop = chatBox.scrollHeight;
}
