import amqplib from "amqplib";

(async () => {
    const queue = "hello";

    // connect to the local broker
    const conn = await amqplib.connect("amqp://localhost");

    // connects to the channel
    const channel = await conn.createChannel();

    // declaring queue
    await channel.assertQueue(queue);

    console.log('listining for queue messages')
    channel.consume(queue, (message) => {
        if (message) {
            console.log("%s", message?.content.toString());
            channel.ack(message);
        } else {
            console.log('Consumer cancelled by server');
        }
    });
})();
