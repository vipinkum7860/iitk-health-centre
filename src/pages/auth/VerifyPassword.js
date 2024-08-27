import React from "react";
import VerifyPasswordForm from "../../components/auth/VerifyPasswordForm";
function VerifyPasswordPage(props) {
  return (
    <div className="flex-container">
      <div className="gif">
        <img src="/assets/gif/Authentication.gif" alt="loading..." />
      </div>
      <div className="welcome">
        <h3>Verify Your Email</h3>
        <p>Health Centre IIT Kanpur</p>
        <VerifyPasswordForm
          setSeverity={props.setSeverity}
          setShowSnachbar={props.setShowSnachbar}
          setSnachbarData={props.setSnachbarData}
        />
      </div>
    </div>
  );
}

export default VerifyPasswordPage;
