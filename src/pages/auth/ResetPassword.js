import React from "react";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
function ResetPasswordPage(props) {
  return (
    <div className="flex-container">
      <div className="gif">
        <img src="/assets/gif/Reset_password.gif" alt="loading..." />
      </div>
      <div className="welcome">
        <h3>Reset Password</h3>
        <p>Health Centre IIT Kanpur</p>
        <ResetPasswordForm
          setSeverity={props.setSeverity}
          setShowSnachbar={props.setShowSnachbar}
          setSnachbarData={props.setSnachbarData}
        />
      </div>
    </div>
  );
}

export default ResetPasswordPage;
