const path = require("path");
import "bootstrap/dist/css/bootstrap.min.css";

module.exports = {
  style: {
    sass: {
      implementation: require("sass"),
      sassOptions: {
        includePaths: [path.join(__dirname, "src/styles")],
      },
    },
  },
};
