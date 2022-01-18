import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const Tokens = (props) => {
  const history = useHistory();
  const { detailsState, setDetailsState } = props;

  const getOTP = async (e) => {
    e.preventDefault();
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    const jsonBody = {
      client_id: "eK0mkkqu8Q03e6uTbP1uuPM8eszgrqf2",
      client_secret: "niZTToFk42DoIOUvShCWYH4S-gb2nND0JG9oHxAZj-en2b3hqCzIZgmvYKRYXoji",
      grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
      otp: detailsState.otp,
      realm: "email",
      username: detailsState.email,
      hashedEmail: 'hash of the email',
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
      setDetailsState({...detailsState, accessToken:token.data.access_token,idToken:token.data.id_token,refreshToken:token.data.refresh_token})
      console.log(token.data.refresh_token);
    } catch (err) {
      console.log(err)
    }
    history.push("/token");
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        EMAIL:
        <input
          type="text"
          value={detailsState.email}
          onChange={(e) => {
            setDetailsState({ ...detailsState, email: e.target.value });
          }}
        ></input>
        Enter OTP:
        <input
          type="text"
          value={detailsState.otp}
          onChange={(e) => {
            setDetailsState({ ...detailsState, otp: e.target.value });
          }}
        ></input>
        <hr/>
        <button
          style={{ with: "50%" }}
          type="button"
          onClick={(e) => getOTP(e)}
        >Verify OTP
        </button>
      </form>
    </div>
  );
};
export default Tokens;
