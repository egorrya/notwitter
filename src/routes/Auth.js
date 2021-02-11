import react from "react";
import AuthForm from "../components/AuthForm";
import { firebaseInstance, authService } from "../firebase";

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === "Google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "Github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <div className="auth ">
        <header>
          <h1 className="logo">Netwitter</h1>
        </header>
        <AuthForm />
        <div className="auth__social">
          <button className="button" onClick={onSocialClick} name="Google">
            Continue with Google
          </button>
          <button className="button" onClick={onSocialClick} name="Github">
            Continue with Github
          </button>
        </div>
      </div>
      <footer>&copy; {new Date().getFullYear()} Notwitter</footer>
    </>
  );
};

export default Auth;
