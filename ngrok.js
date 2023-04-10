//start
const ngrok = require('ngrok');
require('dotenv').config();
const NGROK_AUTH_TOKEN = process.env.NGROK_AUTH_TOKEN;
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT

const bootstrap = async () => {
    await ngrok.authtoken(NGROK_AUTH_TOKEN);
    const base_url = await ngrok.connect({
        addr: PORT
    });
    const socketBaseURl = await ngrok.connect({proto: 'tcp', addr: SOCKET_PORT});
    console.log(`port: ${PORT} baseUrl: ${base_url}`);
    console.log(`port: ${SOCKET_PORT} socket_base_url: ${socketBaseURl}`);
}