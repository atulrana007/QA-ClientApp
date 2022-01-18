import React, { useState } from "react";
import { Button } from "reactstrap";
import axios from 'axios';

export default function ParseSubscription(props) {
  const { Subscription } = props;

  const [selectedValue, setSelectedValue] = useState(
    Object.keys(Subscription)[0]
  );
  const onChange = (e) => {
    setSelectedValue(e.target.value);
  };
  const obj = localStorage.getItem('@@auth0spajs@@::fz2YwYovbQwPjQbvxszl2IQ0p3Q14k7Q::https://api.mcafee.com::openid profile email offline_access');
  const jObj = JSON.parse(obj);
  const ref_token = jObj?.body?.refresh_token;
  const getToken = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: "fz2YwYovbQwPjQbvxszl2IQ0p3Q14k7Q",
      //client_secret: "niZTToFk42DoIOUvShCWYH4S-gb2nND0JG9oHxAZj-en2b3hqCzIZgmvYKRYXoji",
      grant_type: "refresh_token",
      refresh_token: ref_token,
      subrefid: Subscription[selectedValue]
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post("/oauth/token", data,
        {
          headers: optionsLogin,
        }
      );
      console.log(token.data.access_token);
    } catch (err) {
      console.log(err)
    }
  };
  console.log("-----> value", Subscription[selectedValue]);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <select value={selectedValue} onChange={onChange}>
        {Subscription
          ? Object.keys(Subscription).map(function (key, index) {
              return (
                <option value={key} key={`${index}111`}>
                  {key}
                </option>
              );
            })
          : null}
      </select>
      <Button color="primary" className="mt-5" onClick={(e) => getToken(e)}>
        Refresh token call
      </Button>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontWeight: "bold" }}>AccessToken: </p>
        <input
          type="text"
          style={{ width: "100%" }}
          value={props.response.AccessToken}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ marginTop: "0.5rem", wordBreak: "break-all" }}>
          <span style={{ fontWeight: "bold" }}>IdToken:</span>{" "}
        </p>
        <input type="text" value={props.response.IdToken} />
      </div>{" "}
      <div>
        {" "}
        <p style={{ fontWeight: "bold" }}> Custom parameter:</p>
        <input type="text" onChange={(e) => {}}></input>
        <br />
        <Button color="primary" className="mt-5" onClick={() => {}}>
          Refresh token call
        </Button>
      </div> */}
    </div>
  );
}
