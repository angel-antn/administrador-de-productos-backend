import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Administrador de productos Express",
      description: "API Docs para administrador de productos",
      version: "1.0.0",
    },
    tags: [
      {
        name: "Products",
        description: "API Operations realated to products",
      },
    ],
  },
  apis: ["./src/routers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
