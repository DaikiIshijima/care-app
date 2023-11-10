import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import EventModal from "./RegisterComponents/EventModal";

const UserInfo = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // データ取得
  const fetchData = () => {
    fetch("http://localhost:3000/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTPエラー! ステータスコード: ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        if (Array.isArray(responseData)) {
          setData(responseData);
        } else {
          console.error("データが配列ではありません。");
        }
      })
      .catch((error) => {
        console.error("データ取得エラー: ", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddData = (newData) => {
    setData([...data, newData]);
  };

  // モーダルの表示/非表示切り替え
  const toggleModal = () => {
    setModalData(null);
    setShowModal(!showModal);
  };

  // 修正ボタンがクリックされたときの処理
  const handleEditClick = (item) => {
    setModalData(item.name, item.birthDate, item.hobbies, item.otherInfo);
    setShowModal(true);
  };

  // 削除ボタンがクリックされたときの処理
  const handleDeleteClick = (item) => {
    // データを削除するAPIリクエストを送信
    fetch(`http://localhost:3000/data/${item.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // 削除が成功した場合、dataから削除
          const updatedData = data.filter(
            (dataItem) => dataItem.id !== item.id
          );
          setData(updatedData);
        } else {
          console.error(
            "データ削除エラー: HTTPステータスコード",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("データ削除エラー: ", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>利用者情報</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>名前</th>
            <th>生年月日</th>
            <th>趣味</th>
            <th>その他情報</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.birthDate}</td>
              <td>{item.hobbies}</td>
              <td>{item.otherInfo}</td>
              <td>
                <button
                  className="btn btn-info btn-sm m-1"
                  onClick={() => handleEditClick(item)}
                >
                  編集
                </button>
                <button
                  className="btn btn-danger btn-sm m-1"
                  onClick={() => handleDeleteClick(item)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button className="btn btn-primary mb-2" onClick={toggleModal}>
        登録
      </button>
      <EventModal
        show={showModal}
        onHide={toggleModal}
        onAddData={handleAddData}
        editData={modalData}
      />
    </div>
  );
};

export default UserInfo;
