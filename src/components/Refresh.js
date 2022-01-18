import React, { useEffect } from "react";
import axios from "axios";

const OTP = (props) => {
  const { detailsState, setDetailsState } = props;
  const getOTP = async (e) => {
    const optionsLogin = {
      "content-type": "application/x-www-form-urlencoded",
    };
    console.log(detailsState);
    const jsonBody = {
      client_id: "eK0mkkqu8Q03e6uTbP1uuPM8eszgrqf2",
      client_secret:
        "niZTToFk42DoIOUvShCWYH4S-gb2nND0JG9oHxAZj-en2b3hqCzIZgmvYKRYXoji",
      grant_type: "refresh_token",
      refresh_token: detailsState.refreshToken,
      subrefid: detailsState.param1,
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post("oauth/token", data, {
        headers: optionsLogin,
      });
      console.log(detailsState);
      setDetailsState({
        ...detailsState,
        accessToken: token.data.access_token,
        idToken: token.data.id_token,
        refreshToken: token.data.refresh_token,
      });
      console.log(token);
    } catch (err) {
      console.log(err);
    }
    return;
  };
  useEffect(() => {
    getOTP();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      New tokens <br />
      <b>Access token : </b> {detailsState.accessToken}
      <br />
      <b>ID token : </b> {detailsState.idToken}
    </div>
  );
};
export default OTP;
