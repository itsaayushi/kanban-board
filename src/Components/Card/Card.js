import React, { useState } from "react";
import Chip from "../Chip/Chip";

import { Clock, CheckSquare, MoreHorizontal, Edit2 } from "react-feather";

import "./Card.css";
import Dropdown from "../Dropdown/Dropdown";
import CardInfo from "./Cardinfo/Cardinfo";

export default function Card(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <CardInfo
          card={props.card}
          boardId={props.boardId}
          updateCard={props.updateCard}
          onClose={() => setShowModal(false)}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {props.card?.labels?.map((item, index) => (
              <Chip key={index} text={item.text} color={item.color} />
            ))}
          </div>
          <Edit2 onClick={() => setShowModal(true)} className="card_edit" />
          <div className="card_top_more" onClick={() => setShowDropdown(true)}>
            <MoreHorizontal />
            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    Delete card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className="card_title">{props.card?.title}</div>
        <div className="card_footer">
          {props.card?.date && (
            <p>
              <Clock />
              {props.card?.date}
            </p>
          )}

          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {props.card?.tasks?.filter((item) => item.completed).length}/
              {props.card?.tasks?.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
