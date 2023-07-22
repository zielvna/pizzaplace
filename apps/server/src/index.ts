import dotenv from 'dotenv';
dotenv.config();

import { createApp } from './app';
import { createDatabase } from './database';

const app = createApp(process.env.SESSION_SECRET ?? '', process.env.MONGO_URL ?? '', process.env.CLIENT_URL ?? '');
createDatabase(process.env.MONGO_URL ?? '');

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}.`);
});
