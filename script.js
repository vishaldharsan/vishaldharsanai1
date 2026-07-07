const GNEWS_API_KEY = "73702effcb7a47296dedf99091f2c0b8";

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.getElementById("chatBox");

sendBtn.addEventListener("click", searchNews);

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchNews();
});

function addMessage(html) {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = html;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function searchNews() {
    const query = userInput.value.trim();
    if (!query) return;

    addMessage(`<span class="user">You:</span> ${query}`);
    userInput.value = "";

    try {
        const response = await fetch(
            `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${GNEWS_API_KEY}`
        );

        const data = await response.json();

        if (!data.articles || data.articles.length === 0) {
            addMessage("<span class='ai'>News:</span> No news found.");
            return;
        }

        let html = "<span class='ai'>Latest News:</span><br>";

        data.articles.forEach(article => {
            html += `
                <p>
                    <strong>${article.title}</strong><br>
                    <a href="${article.url}" target="_blank">${article.url}</a>
                </p><br>
            `;
        });

        addMessage(html);

    } catch (error) {
        addMessage(`<span class='ai'>Error:</span> ${error.message}`);
    }
}