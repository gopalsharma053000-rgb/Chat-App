import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cookieParser from "cookie-parser";
import { app } from "./lib/socket.js";

app.set("trust proxy", 1);

const corsOptions = {
    origin:['http://localhost:5173'
        ,'https://front-end-teal-eta.vercel.app'],
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type',"Authorization"],
    credentials: true,
}

app.use(cors(corsOptions));

<<<<<<< HEAD
app.use(express.json({ limit: '5mb' }));
=======
app.use(express.json({limit:"5mb"}));
>>>>>>> 0375bdea59d4ba405226f3ef257a147c87e20e17
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

export default app;