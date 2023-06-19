import { app } from "./app";
import { env } from "./env";

// Call the listen function on the app instance, specifying the host and port to listen on.
// The host is set to "0.0.0.0" to listen on all available network interfaces.
// The port is obtained from the env.PORT variable.
app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  // If the listen function resolves successfully, log a message indicating that the server is running.
  .then(() => {
    console.log("🚀 HTTP Server Running!");
  });
