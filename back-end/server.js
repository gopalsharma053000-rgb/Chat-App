import { server } from "./src/lib/socket.js";
import { connectDB } from "./src/db/db.js";
import { ENV } from "./src/lib/env.js";


connectDB();

const PORT = ENV.PORT || 3000

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});