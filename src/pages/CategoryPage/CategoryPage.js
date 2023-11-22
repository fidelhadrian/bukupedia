// CategoryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/card';
import Modal from '../../components/modal';
import './CategoryPage.css';
import { BarLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const CategoryPage = () => {
  const categories = [
    "Animals, Bugs & Pets",
    "Art, Creativity & Music",
    "General Literature",
    "Hobbies, Sports & Outdoors",
    "Science Fiction & Fantasy",
    "Real Life",
    "Science & Technology",
    "Mystery & Suspense",
    "Reference",
  ];

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  const fetchBooksByCategory = async (category, page) => {
    setIsLoading(true);

    try {
      const response = await axios.get('https://book-finder1.p.rapidapi.com/api/search', {
        params: {
          categories: category,
          results_per_page: '10',
          page: page,
        },
        headers: {
          'X-RapidAPI-Key': '1c13e8e686mshcf5aa7fd1bfc0b4p1a0b76jsncc0a6faecb43',
          'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com',
        },
      });

      if (response.status === 200) {
        setBooks(response.data.results);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Mengambil data untuk kategori pertama saat halaman dimuat
    fetchBooksByCategory(categories[0], 1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryClick = (category) => {
    setCurrentPage(1); // Reset halaman ke 1 saat kategori diubah
    fetchBooksByCategory(category, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooksByCategory(categories[0], page);
  };

  const openModal = (item) => {
    setModalItem(item);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <main>
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <p className="title">Books in Category "{categories[0]}"</p>
      {isLoading ? (
        <BarLoader
          color="#6d1f09"
          cssOverride={{
            left: -50,
            width: '300vh',
          }}
        />
      ) : books.length ? (
        <div className="card-container">
          {books.map((item, index) => (
            <Card data={item} key={index} onClick={() => openModal(item)} />
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
        {Array.from({ length: 3 }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === 3}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <Modal data={modalItem} isShow={modalShow} onCancel={closeModal} />
    </main>
  );
};

export default CategoryPage;
