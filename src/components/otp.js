import React from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const OTP = (props) => {
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
      connection: "email",
      email: detailsState.email,
      send: 'code',
    };
    const data = new URLSearchParams(jsonBody).toString();
    try {
      const token = await axios.post("passwordless/start", data,
        {
          headers: optionsLogin,
        }
      );

    } catch (err) {
      console.log(err)
    }
    history.push("/verify");
  };
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column" }}>
        EMAIL:
        <input
          type="text"
          value={props.email}
          onChange={(e) => {
            setDetailsState({ ...detailsState, email: e.target.value });
          }}
        ></input>
        <hr />
        <button
          style={{ with: "50%" }}
          type="button"
          onClick={(e) => getOTP(e)}
        >
          Get OTP on Email
        </button>
      </form>
    </div>
  );
};
export default OTP;
