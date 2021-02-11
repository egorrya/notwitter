import React, { useState } from "react";
import { dbService, storageService } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner, userObj }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete?");

    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  console.log(userObj);

  return (
    <div className="nweets__nweet" key={nweetObj.id}>
      {editing ? (
        <>
          <form className="form form__editing" onSubmit={onSubmit}>
            <input
              className="form__input"
              type="text"
              placeholder="Edit"
              value={newNweet}
              onChange={onChange}
              maxLength={120}
              required
            />
            <input type="submit" value="Update" className="button" />
            <button className="button" onClick={toggleEditing}>
              Cancel
            </button>
          </form>
        </>
      ) : (
        <>
          {/* <h3 className="post__name">{nweetObj.username}</h3> */}
          <h4 className="nweets__text">{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img className="nweets__img" src={nweetObj.attachmentUrl} />
          )}
          {isOwner && (
            <>
              <FontAwesomeIcon
                icon={faPen}
                className="nweets__edit"
                onClick={toggleEditing}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="nweets__delete"
                onClick={onDeleteClick}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
