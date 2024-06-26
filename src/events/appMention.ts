import { App } from "@slack/bolt";

const appMention = async (app: App): Promise<void> => {
  app.event("app_mention", async ({ event, client }) => {
    try {
      // respond to the message
      await client.chat.postMessage({
        channel: event.channel,
        text: `Hello, <@${event.user}>! :wave:`,
      });
    } catch (e) {
      console.error(e);
    }
  });
};

export default appMention;
