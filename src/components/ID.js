import React from "react";

const OTP = (props) => {
  const { detailsState } = props;
  const getOTP = () => {
    console.log("e");
    var base64Url = detailsState.idToken.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const ans = JSON.parse(jsonPayload);

    return ans;
  };
  const parse = getOTP();
  return (
    <div>
      <b>Claims of ID token</b><br/>
      Nickname : {parse.nickname}<br/>
      Name : {parse.name}<br/>
      Email  : {parse.email}<br/>
      Is Email Verified : {parse.email_verified}<br/>
      Picture : {parse.picture}<br/>

    </div>
  );
};
export default OTP;
