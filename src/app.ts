import { App } from "@slack/bolt";
import { InstallProvider } from "@slack/oauth";

import { messageEvent } from "./events/message";
import { receiver } from "./express-receiver";
import { handleLemmeWelcomeThem } from "./lib/actions";
import { handleCommand } from "./lib/commands";

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  appToken: process.env.SLACK_APP_TOKEN!,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  stateSecret: process.env.SLACK_STATE_SECRET!,
  scopes: ["im:write"],
  receiver,
});

export const installer = new InstallProvider({
  clientId: process.env.SLACK_CLIENT_ID!,
  clientSecret: process.env.SLACK_CLIENT_SECRET!,
  stateSecret: process.env.SLACK_STATE_SECRET!,
  directInstall: true,
});

app.command("/bloom", handleCommand);
app.command("/bloom-dev", handleCommand);

// app.view("lemmewelcomethem_form", );

app.action("lemmewelcomethem", handleLemmeWelcomeThem);

// fixme: why wont this work????
app.event("message", messageEvent);
// app.event("channel_created", channelCreateEvent);

export const client: any = app.client;
