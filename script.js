// script.js

// Function to display messages in the chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto scroll to bottom
}

// Handle sending the message to the API
async function sendMessageToBot(message) {
    const apiKey = '2CqH5rW6UJkbzplW0PpGRLLM0nQRxynYBfdZVFgvci3sB2MMbUXZJQQJ99BAACYeBjFXJ3w3AAAaACOG2Vgw';
    const endpoint = 'https://agridost.cognitiveservices.azure.com/s';

    try {
        const response = await axios.post(`${endpoint}?projectName=KrishiBot101&api-version=2021-10-01&deploymentName=production`, {
            question: message
        }, {
            headers: {
                'Ocp-Apim-Subscription-Key': "",
                'Content-Type': 'application/json'
            }
        });

        // Log the full API response for debugging
        console.log('API Response:', response.data);

        const botResponse = response.data.answers ? response.data.answers[0].answer : 'No response from API';
        displayMessage(botResponse, 'bot');
    } catch (error) {
        // Log the error response from the API
        console.error('Error during API call:', error.response ? error.response.data : error.message);
        displayMessage("Sorry, I couldn't process that. Please try again.", 'bot');
    }
}

// Event listener for the send message button
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const userMessage = document.getElementById('userMessage').value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        document.getElementById('userMessage').value = '';
        sendMessageToBot(userMessage);
    }
});

// Allow pressing Enter key to send the message
document.getElementById('userMessage').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendMessageBtn').click();
    }
});
