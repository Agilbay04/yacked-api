import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Yacked App',
            description: 'This is simple api for yacked app, application for sharing post and comment',
            version: '1.0.0',
            contact: {
                name: 'AgilE',
                email: 'bayuagil04@gmail.com',
                url: 'https://agilbay04.github.io/my-portfolio-website/'    
            }
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
        servers: [{
            url: 'http://localhost:3000',
        }],
    },
    apis: ['../routes/*.js'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;
