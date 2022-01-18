import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const OTP = (props) => {
  const history = useHistory();
  const { detailsState, setDetailsState } = props;
  const getOTP = () => {
    var base64Url = detailsState.accessToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const ans = JSON.parse(jsonPayload);
    console.log(ans);
    return ans;
    // return {
    //   "iss": "https://mcafee-authdev.us.auth0.com/",
    //   "sub": "auth0|11004692281177EA1FF59458641ACB8",
    //   "aud": [
    //       "https://testapi.mcafee.com",
    //       "https://mcafee-authdev.us.auth0.com/userinfo"
    //   ],
    //   "iat": 1638461742,
    //   "exp": 1638548142,
    //   "azp": "SgWrPOtEqdG494T1TO7iKgv14diJ8ljJ",
    //   "scope": "openid profile email login create offline_access",
    //   "gty": "password"
    // };

  };
  const parse = getOTP();
  return (
    <div>
      <b>Claims of Access token</b><br/>
      Issuer : {parse.iss}<br/>
      Subject : {parse.sub}<br/>
      Issued at : {parse.iat}<br/>
      Expires in : {parse.exp}<br/>
      Client(Authorized party) : {parse.azp}<br/>
      Scopes : {parse.scope}
    </div>
  );
};
export default OTP;
