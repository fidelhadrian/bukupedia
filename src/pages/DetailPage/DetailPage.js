// pages/DetailPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../../components/modal";

const DetailPage = ({ match }) => {
  const { title, author, series } = match.params;
  const [bookData, setBookData] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get('https://book-finder1.p.rapidapi.com/api/search', {
          params: {
            title,
            author,
            series,
          },
          headers: {
            'X-RapidAPI-Key': '1c13e8e686mshcf5aa7fd1bfc0b4p1a0b76jsncc0a6faecb43',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
          }
        });

        console.log(response.data); // Check the response data

        if (response.status === 200 && response.data.total_results > 0) {
          setBookData(response.data.results[0]);
        } else {
          setBookData(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookData();
  }, [title, author, series]);

  const handleClick = () => {
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <div>
      {bookData ? (
        <>
          <h2>{bookData.title}</h2>
          <p>{bookData.summary}</p>
          <button onClick={handleClick}>Open Modal</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Modal isShow={modalShow} data={bookData} onCancel={handleModalClose} />
    </div>
  );
};

export default DetailPage;
