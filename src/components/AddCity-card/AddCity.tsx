import React, { useState } from "react";

import "./AddCity.scss";
import addDark from "../../assets/svg/add-dark.svg";
import addLight from "../../assets/svg/add-light.svg";
import { usePref } from "../../context/UserPrefProvider";
import Modal from "../Ui/Modal/Modal";
import Search from "../Search/Search";

const AddCity = () => {
  const { theme } = usePref();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="add-city-card">
        <h2>Add City</h2>
        <button onClick={() => setShowModal(true)}>
          {theme === "light" ? (
            <img src={addLight} alt="add city icon" width="100" height="100" />
          ) : (
            <img src={addDark} alt="add city icon" width="100" height="100" />
          )}
        </button>
      </div>
      {showModal ? (
        <Modal isShown={showModal} showHandler={setShowModal}>
          <Modal.Header showHandler={setShowModal}>Add new city</Modal.Header>
          <Modal.Body>
            <Search />
          </Modal.Body>
          <Modal.Footer>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
};

export default AddCity;
