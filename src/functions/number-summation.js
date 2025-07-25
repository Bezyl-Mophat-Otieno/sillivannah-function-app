const { app } = require('@azure/functions');

app.http("number-summmation", {
    authLevel: "anonymous",
    methods: ["POST", "GET"],
    handler: async (request, context) => {
        context.log(`Request received with method: ${request.method}`);
        context.log(`Request query: ${JSON.stringify(request.query)}`);
        const requestBody = request.json() || {};
        context.log(`Request body: ${JSON.stringify(requestBody)}`);

        const firstNumber = parseInt(request.query.get("firstNumber") || (requestBody && requestBody.firstNumber));
        const secondNumber = parseInt(request.query.get("secondNumber") || (requestBody && requestBody.secondNumber));

        if (!firstNumber || !secondNumber) {
            context.log("Invalid input: Missing firstNumber or secondNumber.");
            return {
                status: 400,
                body: "Please provide both firstNumber and secondNumber"
            };
        }

        const sum = firstNumber + secondNumber;
        
        return {
            status: 200,
            body: `The sum of ${firstNumber} and ${secondNumber} is ${sum}.`
        };
    }
});
