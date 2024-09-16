self.onmessage = function(e) {
    const { message, index } = e.data;
    const words = message.toLowerCase().split(' ');
    let responseScores = {};

    // Iterate over each word in the user's message
    words.forEach(word => {
        if (index[word]) {
            // If a matching keyword is found, calculate the score for each response
            index[word].forEach(item => {
                if (!responseScores[item.response]) {
                    responseScores[item.response] = 0;
                }
                responseScores[item.response] += 1; // Increment score for each matched keyword
            });
        }
    });

    // Determine the best response based on the highest score
    let bestResponse = '';
    let highestScore = 0;
    for (const [response, score] of Object.entries(responseScores)) {
        if (score > highestScore) {
            highestScore = score;
            bestResponse = response;
        }
    }

    // If no response was found, set a default response
    if (!bestResponse) {
        bestResponse = "I'm here to help with any questions you have about GAZEBO Inc. What would you like to know?";
    }

    // Send the best response back to the main script
    self.postMessage({ response: bestResponse });
};
