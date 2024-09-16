let context = {};
let responseData = {};

// Load the response data from the JSON file
fetch('response-data.json')
    .then(response => response.json())
    .then(data => {
        responseData = data;
        displayInitialGreeting(); // Display initial greeting after loading data
    })
    .catch(error => console.error('Error loading response data:', error));

function toggleChat() {
    const chatbox = document.querySelector('.chatbox');
    chatbox.classList.toggle('show');
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatboxBody = document.getElementById('chatbox-body');
    const userMessage = chatInput.value.trim();

    if (!userMessage) {
        return; // Don't send empty messages
    }

    // Display user message
    displayMessage(userMessage, 'user-message');
    chatInput.value = '';

    // Get AI response based on user message
    const aiMessage = getAIResponse(userMessage.toLowerCase());

    // Display AI message
    displayMessage(aiMessage, 'ai-message');
}

function refreshChat() {
    const chatboxBody = document.getElementById('chatbox-body');
    chatboxBody.innerHTML = ''; // Clear the chatbox
    displayInitialGreeting(); // Reset to the initial greeting
}

function displayInitialGreeting() {
    const chatboxBody = document.getElementById('chatbox-body');
    const greetingMessage = "Hello, I am AEDAN, your friendly AI chatbot. Would you like me to provide you with a list of all possible questions I can assist you with?";

    displayMessage(greetingMessage, 'ai-message');

    // Display yes/no buttons
    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.className = 'chat-button';
    yesButton.onclick = () => {
        displayAllQuestions(
            `1. What is a POS system?
            2. What are the benefits of using a POS system?
            3. What is a payment gateway?
            4. How does a payment gateway work?
            5. What are some popular POS systems?
            6. What are some popular payment gateways?
            7. What should be considered when choosing a POS system?
            8. How do you integrate a payment gateway?
            9. What security measures are used in POS systems?
            10. How does inventory management work with a POS system?
            11. What are the advantages of using a POS system?
            12. What are the common features of a POS system?
            13. What types of POS systems are there?
            14. What is PCI DSS compliance?
            15. What should be considered when choosing a payment gateway?
            16. What is the difference between a POS system and a payment gateway?
            17. What is the cost of POS systems?
            18. What are the common POS hardware components?
            19. What are cloud-based POS systems?
            20. What are mobile POS systems?
            21. How can POS systems be integrated with e-commerce platforms?
            22. What POS systems are suitable for small businesses?
            23. What POS systems are suitable for restaurants?
            24. What support and maintenance are needed for POS systems?
            25. How can POS systems be customized?
            26. What are multi-location POS systems?
            27. What are secure payment gateways?
            28. What are payment gateway fees?
            29. What payment methods are supported by gateways?
            30. What should be considered when choosing a payment gateway for e-commerce?
            31. How does international payment processing work?
            32. What are the steps for integrating a payment gateway?
            33. What fraud prevention features do payment gateways offer?
            34. What payment gateways support recurring billing?
            35. What is real-time transaction processing?
            36. What payment gateways are suitable for mobile apps?
            37. What POS systems are suitable for retail?
            38. What are the benefits of mobile POS systems?
            39. What are the advantages of cloud-based POS systems?
            40. How can POS systems be integrated with accounting software?
            41. How can PCI DSS compliance be achieved for POS systems?
            42. How can POS systems be used for inventory management?
            43. What is the importance of customer relationship management (CRM) in POS systems?
            44. What should be considered when choosing a POS system for a restaurant?
            45. What should be considered when choosing a payment gateway for a small business?
            46. What are the advantages of integrating POS systems with e-commerce platforms?
            47. What are the features of tablet POS systems?
            48. What are the advantages of multi-location POS systems?
            49. How can PCI DSS compliance be achieved for payment gateways?
            50. How can payment gateways be integrated with mobile apps?
            51. What are the benefits of real-time reporting in POS systems?
            52. What payment gateways support subscription services?
            53. Why are secure payment gateways important?
            54. What are the features of cloud-based payment gateways?
            55. What should be considered when choosing a POS system for retail?
            56. How can POS systems be integrated with loyalty programs?
            57. What are the benefits of mobile POS systems for events?
            58. What are the benefits of integrating POS systems with accounting software?
            59. What are the features of mobile POS systems?
            60. What are the advantages of tablet POS systems?
            61. What should be considered when choosing a payment gateway for mobile apps?
            62. Why is PCI DSS compliance important for POS systems and payment gateways?
            63. What are the benefits of real-time transaction processing?
            64. Why is fraud prevention important in payment gateways?
            65. How can POS systems be integrated with online ordering platforms?
            66. What are the advantages of using POS systems for small businesses?
            67. Why is PCI DSS compliance important for businesses?
            68. What are the benefits of real-time inventory tracking with POS systems?
            69. What are the benefits of integrating POS systems with CRM?
            70. What should be considered when choosing a POS system for a multi-location business?`
        );
    };

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.className = 'chat-button';
    noButton.onclick = () => {
        displayMessage("Okay! Let me know how else I can assist you.", 'ai-message');
    };

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);

    chatboxBody.appendChild(buttonContainer);
}

function displayAllQuestions(questions) {
    const chatboxBody = document.getElementById('chatbox-body');
    chatboxBody.innerHTML = ''; // Clear the chatbox

    const questionsArray = questions.split('\n').map(question => question.trim()).filter(question => question !== '');
    const questionsMessage = "Here are the questions I can assist you with:<br>" + questionsArray.join('<br>');
    displayMessage(questionsMessage, 'ai-message');
}

function displayMessage(message, className) {
    const chatboxBody = document.getElementById('chatbox-body');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.className = className;
    chatboxBody.appendChild(messageElement);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
}

function getAIResponse(message) {
    const { responses, detailedResponses, synonyms } = responseData;
    if (!responses || !detailedResponses || !synonyms) {
        return "Error: Response data is not properly loaded.";
    }

    const keywords = Object.keys(responses).reduce((acc, key) => {
        acc[key] = key.split(' ');
        return acc;
    }, {});

    const processedMessage = message.split(' ');

    for (const key in keywords) {
        const keyWords = keywords[key];
        const match = keyWords.every(kw => processedMessage.includes(kw) || (synonyms[kw] && synonyms[kw].some(syn => processedMessage.includes(syn))));
        if (match) {
            context.lastQuestion = key;
            return responses[key];
        }
    }

    // Handle follow-up questions based on context
    if (context.lastQuestion) {
        for (const detail in detailedResponses[context.lastQuestion]) {
            if (processedMessage.includes(detail)) {
                return detailedResponses[context.lastQuestion][detail];
            }
        }

        const followUpResponses = {
            "what is a pos system": "Would you like to know about specific features or types of POS systems?",
            "benefits of using a pos system": "Do you want more details on how it can improve accuracy or customer service?",
            "what is a payment gateway": "Would you like to know about integration or security aspects of payment gateways?",
            "how does a payment gateway work": "Are you interested in the security aspects or transaction fees?"
        };

        if (followUpResponses[context.lastQuestion]) {
            return followUpResponses[context.lastQuestion];
        }
    }

    return "I'm sorry, I don't have information on that topic. Can you please ask something else related to POS systems or payment gateways?";
}

window.toggleChat = toggleChat;
window.sendMessage = sendMessage;
window.refreshChat = refreshChat;
