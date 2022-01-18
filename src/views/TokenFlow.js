import React from "react";
import { Button } from "reactstrap";
import axios from 'axios';

function TokenFlow(props) {
  const { tokenFlow, setTokenFlowState } = props;
  const onChange = (e) => {
    setTokenFlowState({
      ...tokenFlow,
      [e.target.name]: e.target.value,
    });
  };

  const ROPG = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: "eK0mkkqu8Q03e6uTbP1uuPM8eszgrqf2",
      client_secret: "niZTToFk42DoIOUvShCWYH4S-gb2nND0JG9oHxAZj-en2b3hqCzIZgmvYKRYXoji",
      grant_type: "password",
      username: tokenFlow.username,
      realm: "AV-Password-Authentication",
      password: tokenFlow.password,
      audience: "https://api.mcafee.com",
      scope: "openid profile email offline_access"
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post("oauth/token", data,
        {
          headers: optionsLogin,
        }
      );
      setTokenFlowState({...tokenFlow, AccessToken:token.data.access_token, IdToken:token.data.id_token});
      //setDetailsState({...detailsState, accessToken:token.data.access_token,idToken:token.data.id_token,refreshToken:token.data.refresh_token})
      console.log(token);
    } catch (err) {
      console.log(err)
    }
    //history.push("/token");
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      UserName:
      <input
        type="text"
        name="username"
        onChange={(e) => onChange(e)}
        value={tokenFlow.username}
      ></input>
      Password:
      <input
        type="password"
        name="password"
        onChange={(e) => onChange(e)}
        value={tokenFlow.password}
      ></input>
      <Button
        style={{ marginTop: "1rem" }}
        id="qsLoginBtn"
        color="primary"
        className="btn-margin"
        onClick={(e) => ROPG(e)}
      >
        Get Tokens
      </Button>
      {tokenFlow.AccessToken && (
        <label style={{ marginTop: "1rem" }}>
          AccessToken
          <input
            type="text"
            name="AccessToken"
            onChange={(e) => onChange(e)}
            value={tokenFlow.AccessToken}
          ></input>
        </label>
      )}
      {tokenFlow.IdToken && (
        <label style={{ marginTop: "1rem" }}>
          IdToken
          <input
            type="text"
            name="IdToken"
            onChange={(e) => onChange(e)}
            value={tokenFlow.IdToken}
          ></input>
        </label>
      )}
    </div>
  );
}

export default TokenFlow;
