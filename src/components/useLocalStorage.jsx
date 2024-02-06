import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {

  //using localstorage to store the songs
  const [value, setValue] = useState(() => {
    //string the song value using key
    const storedValue = JSON.parse(localStorage.getItem(key));
    //return the value
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    //setting the localstorage using setItem
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  //return the value
  return [value, setValue];
};

export default useLocalStorage;
