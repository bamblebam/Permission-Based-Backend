import app from "./src/app";

const port = process.env.PORT || 3000;

// Listening to Requests
(async () => {
  try {
    // Connecting to Database
    const isConnected = true;

    // If Connection Successful
    if (isConnected)
      app.listen(port, () =>
        console.log(`Server listening for requests on port ${port}`)
      );
    else process.exit();
  } catch (e) {
    console.log(e);
  }
})();
