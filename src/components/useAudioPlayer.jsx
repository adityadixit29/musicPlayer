import { useRef } from 'react';

const useAudioPlayer = () => {
  const songsrc = useRef(new Audio());
  return { songsrc};
};

export default useAudioPlayer;
