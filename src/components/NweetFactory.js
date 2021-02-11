import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storageService, dbService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";

    if (attachment != "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      username: userObj.displayName,
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("nweets").add(nweetObj);

    setAttachment("");
    setNweet("");
  };

  const onChange = (event) => {
    // get VALUE inside of EVENT
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    // get FILES inside of EVENT
    const {
      target: { files },
    } = event;
    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachmentClick = () => setAttachment(null);
  return (
    <form className="form" onSubmit={onSubmit}>
      <input
        className="form__input"
        value={nweet}
        onChange={onChange}
        type="textarea"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <div className="file-input">
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          id="file"
          className="file"
        />
        <label for="file">
          <FontAwesomeIcon icon={faImage} />
          Select file
        </label>
      </div>

      <input type="submit" className="home__button button" value="Tweet" />
      {attachment && (
        <div className="form__attachment">
          <img src={attachment} alt="Nweet Image" />
          <button onClick={onClearAttachmentClick}>
            <FontAwesomeIcon icon={faTimes} /> Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
