import express from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "../routes/routes.js";
import { infoLog, errorLog } from "./middlewares/logging.js";
import { errorHandler } from "./middlewares/apiResponse.js";
import { currentDate, localDate } from "./helpers/dateHelper.js";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpecs from "./docs/swagger.js";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(infoLog);
app.use(routes);
app.use(errorLog);
app.use(errorHandler);

config();

const port = process.env.PORT;

app.listen(port, () => {
    console.info(`[${localDate(currentDate())}] Application is runnning on http://localhost:${port}`);
});