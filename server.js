import express from 'express';
import 'dotenv/config';
import mongoose from "mongoose";
import { router as productRouter} from "./routes/productRoute.js";
import { router as orderRouter} from "./routes/orderRoute.js";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose
    .connect(process.env.DB_LINK)
    .then((res) => console.log('DB connected'))
    .catch(reason => console.log(reason));

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
});