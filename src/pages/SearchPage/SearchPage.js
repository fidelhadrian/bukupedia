import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/card";
import Modal from "../../components/modal";
import { BarLoader } from "react-spinners";
import "./SearchPage.css";

const SearchPage = () => {
  const [author, setAuthor] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get('https://book-finder1.p.rapidapi.com/api/search', {
          params: {
            author: author,
            results_per_page: '10', // You can adjust this as needed
            page: '1',
          },
          headers: {
            'X-RapidAPI-Key': '1c13e8e686mshcf5aa7fd1bfc0b4p1a0b76jsncc0a6faecb43',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
          }
        });

        if (response.status === 200) {
          setResults(response.data.results);
        }
      } catch (error) {
        console.error('Error during search:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [author]);

  const handleClick = (item) => {
    setModalShow(!modalShow);
    setModalItem(item);
  };

  return (
    <div className="search-page">
      <h1>Book Search by Author</h1>
      <div className="search-form">
        <div className="form-group row mt-0 mb-2">
          <label className="col-sm-2 col-form-label"><strong>Author</strong></label>
          <div className="col-sm-10">
            <input type="text" name="author" className="form-control" value={author} placeholder="Author's name" onChange={(e) => setAuthor(e.target.value)} />
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setResults([])}>
          Clear Results
        </button>
      </div>

      {isLoading ? (
        <BarLoader color="#6d1f09" />
      ) : results.length > 0 ? (
        <div className="search-results">
          <h2>Search Results</h2>
          {results.map((book) => (
            <Card key={book.work_id} data={book} onClick={() => handleClick(book)} />
          ))}
        </div>
      ) : (
        <p className="not-found">Books not found</p>
      )}

      <Modal
        data={modalItem}
        isShow={modalShow}
        onCancel={() => setModalShow(false)}
      />
    </div>
  );
};

export default SearchPage;
