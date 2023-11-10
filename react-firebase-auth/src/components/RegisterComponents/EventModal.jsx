import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EventModal = ({ show, onHide, onAddData, editData }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [otherInfo, setOtherInfo] = useState("");

  const handleSubmit = () => {
    const newData = { name, birthDate, hobbies, otherInfo };

    fetch("http://localhost:3000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        onAddData(responseData);
        // モーダルを閉じる
        onHide();
      })
      .catch((error) => {
        console.error("データ保存エラー: ", error);
      });

    useEffect(
      (props) => {
        if (editData) {
          setName(props.item.name);
          setBirthDate(props.item.birthDate);
          setHobbies(props.item.hobbies);
          setOtherInfo(props.item.otherInfo);
        }
      },
      [editData]
    );
  };
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>利用者情報の登録</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>名前:</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>生年月日:</label>
            <input
              type="text"
              className="form-control"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>趣味:</label>
            <input
              type="text"
              className="form-control"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>生育歴:</label>
            <textarea
              className="form-control"
              value={otherInfo}
              onChange={(e) => setOtherInfo(e.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          キャンセル
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          保存
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
