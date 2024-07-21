import express from "express";
import { config } from "dotenv";
import moment from "moment-timezone";
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "../routes/routes.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpecs from "./swagger.js";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(routes);

config();

const port = process.env.PORT;
moment.tz.setDefault(process.env.TZ);

app.listen(port, () => {
    console.info(`Application is runnning on http://localhost:${port}`);
});