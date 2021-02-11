import react, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { authService, dbService } from "../firebase";

export default ({ refreshUser, userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();

    nweets.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }

    refreshUser();
  };

  return (
    <>
      <form className="profile form" onSubmit={onSubmit}>
        <input
          type="text"
          className="form__input"
          placeholder="Display name"
          onChange={onChange}
          maxLength={18}
        />
        <input className="button" type="submit" value="Update Profile" />
        <button className="button" onClick={onLogOutClick}>
          Log Out
        </button>
      </form>
    </>
  );
};
