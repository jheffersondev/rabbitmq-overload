import amqplib from "amqplib";
import { v4 as uuidv4 } from "uuid";

async function sendMessage(messageId: number, conn: any, channel: any) {
    const queue = "hello";

    //declaring a queue
    await channel.assertQueue(queue);

    const otp = uuidv4();
    const message = "Your otp security code is: " + otp;
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`[x] Message ${messageId} sent`);
}

// connecting to local broker
const conn = amqplib.connect("amqp://localhost");


conn.then(async (conn) => {
    // creating broker channel
    const channel = await conn.createChannel();

    console.log('connection stabelished')
    for (let i = 0; i <= 100000; i++) {
        sendMessage(i, conn, channel);
    }
});
