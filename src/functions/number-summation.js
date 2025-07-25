const { app } = require('@azure/functions')

app.http("number-summmation", {
    authLevel: "anonymous",
    methods: ["POST", "GET"],
    handler: async (request, context)=>{
        context.log(`Request received with method: ${request.method}`);
        context.log(`Request query: ${JSON.stringify(request.query)}`);
        context.log(`Request body: ${JSON.stringify(request.body)}`);
        const firstNumber = parseInt(request.query.firstNumber || request.body.firstNumber);
        const secondNumber = parseInt(request.query.secondNumber || request.body.secondNumber);
        if(!firstNumber || !secondNumber) {
            return {
                status: 400,
                body: "Please provide both firstNumber and secondNumber"
            }
        }

        const sum = firstNumber + secondNumber;
        return {
            status: 200,
            body: `The sum of ${firstNumber} and ${secondNumber} is ${sum}`
        }
    }
})

