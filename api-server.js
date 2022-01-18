process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const authConfig = require("./src/auth_config.json");
const proxy = require("express-http-proxy");

const app = express();

const port = process.env.API_PORT || 3001;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || `http://localhost:${appPort}`;

// if (
//   !authConfig.domain ||
//   !authConfig.audience ||
//   authConfig.audience === "YOUR_API_IDENTIFIER"
// ) {
//   console.log(
//     "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
//   );

//   process.exit();
// }

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

app.get("/api/external", (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.post(
  "/v2/ProductProvision/GetSubscriptions",
  proxy("https://provision.ppqa1.ccs.mcafee.com"),
  async (req, res) => {
    const optionsLogin = {
      "content-type": "application/json",
      cd: "e8ed6c5f2bb44875abc220cb07c27898-f4922599d076",
      st: 3,
      sv: "V1",
      ak: "839B7212425445D1A1113E42708908C5PPS",
    };
    const jsonBody = {
      app_id: "f989723c-3e01-4328-8424-740383c26c11",
      type: "ByGlobalRef",
      Global_Reference_Id: "110025558474456664C6B906848DFAF",
      Include_All_Subs: true,
    };

    try {
      const token = await axios.post(
        "/v2/ProductProvision/GetSubscriptions",
        jsonBody,
        {
          headers: optionsLogin,
        }
      );
      const provisionList = token?.data?.provision_list;
      const FinalList = provisionList.reduce((result, item) => {
        return { ...result, [item.pkg_name]: item?.provision_id };
      }, {});
      res.send({ msg: FinalList });
    } catch (err) {
      res.send({
        error: err.message,
        dis: err.description,
      });
      console.log(err);
    }
  }
);

app.listen(port, () => console.log(`API Server listening on port ${port}`));
