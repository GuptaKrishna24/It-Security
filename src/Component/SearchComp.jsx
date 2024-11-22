import React, { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { API_ROOT } from '../apiConfig';

const debouncedHandleClickOutside = debounce((event, setIsOpen, setSearchQuery, searchContainerRef) => {
  if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
    setIsOpen(false);
    setSearchQuery(""); // Clear search query when closing outside
  }
}, 100);

const debouncedFetch = debounce(async (query, setSearchResults, searchQuery) => {
  if (!query) {
    setSearchResults([]);
    return;
  }

  try {
    const response = await fetch(
      `${API_ROOT}/api/post/navsearch/${query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (query === searchQuery.trim()) {
      setSearchResults(data?.postData);
    }
  } catch (error) {
    setSearchResults([]);
    console.error("Error fetching data:", error);
  }
}, 300);

export const SearchComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = () => {
    window.location.href = searchQuery.trim() === ""
      ? "/search/all/latest"
      : `/search/all/${searchQuery}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    debouncedFetch(searchQuery, setSearchResults, searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      debouncedHandleClickOutside(event, setIsOpen, setSearchQuery, searchContainerRef);
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const toggleSearch = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const handleSearchIconClick = (e) => {
    e.stopPropagation();
    if (isOpen) {
      handleSearchSubmit();
    } else {
      toggleSearch();
    }
  };

  // const firstCatSlug = searchResults?.length > 0 ? searchResults[0]?.cat_slug : "";

  return (
    <div className="search-container mt-1" ref={searchContainerRef}>
      {isOpen ? (
        <input
          type="text"
          placeholder="Search Here"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyPress}
        />
      ) : (
        <FaSearch className="search-icon" onClick={handleSearchIconClick} />
      )}
      {isOpen && <FaTimes className="close-icon" onClick={toggleSearch} />}

      {isOpen && searchQuery && (
        <div className="searchMainBox">
          <ul className="searchBox">
            {searchResults?.length > 0 ? (
              searchResults?.map((result) => (
                <a
                  className="text-black"
                  href={`/${result?.cat_slug}/${result?.post_name}`}
                  key={result.id}
                >
                  <li className="searchField borderB hoverHead text-black">
                    {result?.post_title}
                  </li>
                </a>
              ))
            ) : (
              <li className="searchField borderB hoverHead notFound">
                No Result
              </li>
            )}
            {searchResults?.length > 0 && (
              <a href={`/search/all/${searchQuery}`} className="allResult">
                View All Results
              </a>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
