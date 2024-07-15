import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Yacked App [api docs]',
            description: 'Author: AgilE',
            version: '1.0.0',
            contact: {
                email: 'johndoe@gmail.com'    
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
    },
    apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

export default swaggerSpecs;