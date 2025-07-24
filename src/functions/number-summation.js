const { app } = require('@azure/functions');

app.http('number-summation', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const { firstNumber, seconodNumber } = request.body;
        if (typeof firstNumber !== 'number' || typeof seconodNumber !== 'number') {
            return { status: 400, body: 'Invalid input. Please provide two numbers.' };
        }

        const sum = firstNumber + seconodNumber;
        const responseMessage = `The sum of ${firstNumber} and ${seconodNumber} is ${sum}.`;

        context.res = {
            status: 200,
            body: responseMessage
        };
        return context.res;
    }
});
