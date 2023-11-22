import React, { useState, useEffect } from "react";

import axios from "axios";
import Card from "../../components/card";
import Modal from "../../components/modal";
import './LandingPage.css';
import { BarLoader } from "react-spinners";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const [data, setData] = useState({ total_results: 0, total_pages: 0, results: [] });
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("Wings of fire");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get('https://book-finder1.p.rapidapi.com/api/search', {
          params: {
            series: query,
            book_type: 'Fiction',
            lexile_min: '600',
            lexile_max: '800',
            results_per_page: '25',
            
          },
          headers: {
            'X-RapidAPI-Key': '1c13e8e686mshcf5aa7fd1bfc0b4p1a0b76jsncc0a6faecb43',
            'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
          }
        });

        if (response.status === 200) {
          setData(response.data);
          setisLoaded(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (!isLoaded) {
      fetchData();
    }
  }, [isLoaded, query, currentPage]);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      setisLoaded(false);
      setCurrentPage(1);
      setQuery(e.target.value);
    }
  };

  const handleClick = (item) => {
    setModalShow(!modalShow);
    setModalItem(item);
  };

  const handlePageChange = (newPage) => {
    setisLoaded(false);
    setCurrentPage(newPage);
  };

  return (
    <main>
      <input
        type="text"
        placeholder="Search book here"
        onKeyDown={(e) => onSearch(e)}
      />
      <p className="title">Result for "{query}"</p>
      {isLoading ? (
        <BarLoader 
        
        color="#6d1f09"  
        cssOverride={{
          left:-50,
          width: '300vh',
        }}/>
      ) : data.results.length ? (
        <div className="card-container">
          {data.results.map((item, index) => (
            <Card data={item} key={index} onClick={() => handleClick(item)} />
          ))}
        </div>
      ) : (
        <p className="not-found">Books not found</p>
      )}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        {Array.from(
          { length: data.total_pages },
          (_, i) => i + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data.total_pages}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <Modal
        data={modalItem}
        isShow={modalShow}
        onCancel={() => setModalShow(false)}
      />
    </main>
  );
};

export default LandingPage;
