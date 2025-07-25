const { app } = require('@azure/functions');

app.http("number-summmation", {
    authLevel: "anonymous",
    methods: ["POST", "GET"],
    handler: async (request, context) => {
        context.log(`Request received with method: ${request.method}`);
        context.log(`Request query: ${JSON.stringify(request.query)}`);
        
        // Log the raw request body for debugging
        context.log(`Raw Request Body: ${request.rawBody}`);
        
        let requestBody;
        
        // Check if the body exists, then parse the rawBody for POST requests
        if (request.rawBody) {
            try {
                requestBody = JSON.parse(request.rawBody); // Manually parse rawBody
            } catch (error) {
                context.log("Error parsing body:", error);
                return {
                    status: 400,
                    body: "Invalid JSON format."
                };
            }
        }

        // If firstNumber and secondNumber are in the query, use query params; otherwise, use the body
        const firstNumber = parseInt(request.query.firstNumber || (requestBody && requestBody.firstNumber));
        const secondNumber = parseInt(request.query.secondNumber || (requestBody && requestBody.secondNumber));

        // Check if both numbers are valid
        if (!firstNumber || !secondNumber) {
            context.log("Invalid input: Missing firstNumber or secondNumber.");
            return {
                status: 400,
                body: "Please provide both firstNumber and secondNumber"
            };
        }

        // Calculate the sum
        const sum = firstNumber + secondNumber;
        
        // Return the result
        return {
            status: 200,
            body: `The sum of ${firstNumber} and ${secondNumber} is ${sum}.`
        };
    }
});
