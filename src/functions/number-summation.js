const { app } = require('@azure/functions');

app.http('number-summation', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const firstNumber = parseInt(request.query.firstNumber) || parseInt(request.body.firstNumber);
        const secondNumber = parseInt(request.query.secondNumber) || parseInt(request.body.secondNumber);

        if (!firstNumber || !secondNumber) {
            context.log('Invalid input: firstNumber or secondNumber is missing or not a number.');
            return { status: 400, body: 'Invalid input. Please provide two numbers.' };
        }

        const sum = firstNumber + seconodNumber;
        const responseMessage = `The sum of ${firstNumber} and ${seconodNumber} is ${sum}.`;

       
        return {status: 200, body: responseMessage}
    }
});
