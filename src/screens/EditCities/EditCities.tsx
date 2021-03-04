import React, { useState } from "react";
import { Link } from "react-router-dom";
import { usePref } from "../../context/UserPrefProvider";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import backBtnIcon from "../../assets/svg/back-btn.svg";
import "./EditCities.scss";
import Modal from "../../components/Ui/Modal/Modal";

const EditCities = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const { cities, removeCity, changeCitiesOrder, theme } = usePref();

  const handleRemoveCity = (cityName: string) => {
    setShowModal(true);
    setSelectedCity(cityName);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(cities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    changeCitiesOrder(items);
  };

  return (
    <div className={`edit-cities-wrapper ${theme === "dark" && "dark"} `}>
      <div className="wrap">
        <div className="back-btn-container">
          <Link to="/">
            <img src={backBtnIcon} alt="left arrow" width="100" height="127" />
          </Link>
        </div>
        <section className="edit-cities-container">
          <header className="edit-cities__title">
            <h3>Change orders or remove city</h3>
          </header>
          <div className="zone">
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="cities">
                {(provided) => (
                  <ul
                    className="cities edit-cities__ul"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {cities.map((city, index) => {
                      return (
                        <Draggable
                          key={city.title}
                          draggableId={city.title}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <button
                                className="remove-btn"
                                onClick={() => handleRemoveCity(city.title)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <path d="M0 0h24v24H0z" fill="none" />
                                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                </svg>
                              </button>
                              <p>{city.title}</p>
                              <button className="drag-btn">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  enableBackground="new 0 0 24 24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  width="24"
                                >
                                  <g>
                                    <rect fill="none" height="24" width="24" />
                                  </g>
                                  <g>
                                    <g>
                                      <g>
                                        <path d="M20,9H4v2h16V9z M4,15h16v-2H4V15z" />
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </button>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </section>
      </div>
      {showModal && (
        <Modal isShown={showModal} showHandler={setShowModal} height="250px">
          <Modal.Header showHandler={setShowModal}>Confirmation</Modal.Header>
          <Modal.Body>
            <h1>Are you sure to remove {selectedCity} ?</h1>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="delete-btn"
              onClick={() => {
                setSelectedCity("");
                removeCity(selectedCity);
                setShowModal(false);
              }}
            >
              Delete
            </button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EditCities;
