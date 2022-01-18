import React from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

function MainComponent(props) {
  const { setSubscription } = props;
  const history = useHistory();
  const getParse = (e) => {
    if (e.target.id === "AccessTokenParse") {
      history.push("/parseLoginAccessToken");
    } else if (e.target.id === "IdTokenParse") {
      history.push("/parseLoginIdToken");
    } else if (e.target.id === "refresh") {
      history.push("/parseRefreshToken");
    }
  };

  const getSubs = async (e) => {
    e.preventDefault();
    //console.log("get-otp", detailsState);
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
    //const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post(
        "v2/ProductProvision/GetSubscriptions",
        jsonBody,
        {
          headers: optionsLogin,
        }
      );
      const provisionList = token?.data?.provision_list;
      const FinalList = provisionList.reduce((result, item) => {
        return { ...result, [item.pkg_name]: item?.provision_id };
      }, {});
      setSubscription(FinalList);
      console.log(FinalList);
      history.push("/parseSubscription");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontWeight: "bold" }}>AccessToken: </p>
        <input
          type="text"
          style={{ width: "100%" }}
          onChange={() => {}}
          value={props.response.AccessToken}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ marginTop: "0.5rem", wordBreak: "break-all" }}>
          <span style={{ fontWeight: "bold" }}>IdToken:</span>{" "}
        </p>
        <input type="text" onChange={() => {}} value={props.response.IdToken} />
        <Button
          color="primary"
          className="mt-5"
          id="AccessTokenParse"
          onClick={(e) => getParse(e)}
        >
          Parse Tokens
        </Button>
        <hr />
        <Button
          color="primary"
          className="mt-5"
          id="getSubscriptions"
          onClick={(e) => getSubs(e)}
        >
          Get Subscriptions
        </Button>
      </div>
    </div>
  );
}

export default MainComponent;
