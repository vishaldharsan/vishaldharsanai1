const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
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
        const response = await puter.ai.chat(message, {
            model: "openai/gpt-5.5"
        });

        removeLoading();

        let reply = "";

        if (typeof response === "string") {
            reply = response;
        } else if (response?.message?.content) {
            reply = response.message.content;
        } else if (response?.text) {
            reply = response.text;
        } else {
            reply = JSON.stringify(response, null, 2);
        }

        addMessage("Vishal Dharsan AI", reply);

    } catch (error) {
        removeLoading();
        addMessage("Error", error.message || "Something went wrong.");
    }
}

function addMessage(sender, message) {
    const div = document.createElement("div");
    div.className = "message";

    div.innerHTML = `
        <p><strong>${sender}</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById("loading");
    if (loading) {
        loading.remove();
    }
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}
