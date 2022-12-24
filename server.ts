import app from "./src/app";
import sequelize from "./src/db";

const port = process.env.PORT || 3000;

// Listening to Requests
(async () => {
  try {
    // Connecting to Database
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("Connection has been established successfully.");

    // If Connection Successful
    app.listen(port, () =>
      console.log(`Server listening for requests on port ${port}`)
    );
  } catch (e) {
    console.log(e);
  }
})();
