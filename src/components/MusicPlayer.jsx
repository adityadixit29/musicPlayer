import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import useAudioPlayer from './useAudioPlayer';

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useLocalStorage('playlist', []);
  const [currentSongIndex, setCurrentSongIndex] = useLocalStorage('currentSongIndex', null);
  const { songsrc } = useAudioPlayer();
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
    if (playlist.length > 0 && currentSongIndex !== null && isPlaying) {
      const song = playlist[currentSongIndex];
      songsrc.current.currentTime = song.currentTime;
    }
  }, [songsrc,playlist, currentSongIndex, isPlaying]);

  const handleFileChange = (e) => {
    const newSong = {
      //setting id so that we can uniquely identify the song
      id: Date.now(),
      //setting file
      file: e.target.files[0],
      //keeping the track of current time
      currentTime: 0,
      name: e.target.files[0].name,
      //setting the url
      src: URL.createObjectURL(e.target.files[0]), // Save the object URL as src
    };
    //setting playlist for new song
    setPlaylist([...playlist, newSong]);
    //checking playlist length so that if there is only one song play that song
    if (playlist.length === 0) {
      playSong(0);
    }
  };
  
  const playSong = (index) => {
    const song = playlist[index];
    //to play song
    if (song) {
      songsrc.current.src = song.src;
      songsrc.current.currentTime = song.currentTime;
      songsrc.current.play();
      setCurrentSongIndex(index);
    }
  };

  const handleDestroyStorage = () => {
    //For resettig the playlist
    localStorage.removeItem('playlist');
    //setting playlist to empty
    setPlaylist([]);
    //song index
    setCurrentSongIndex(null);
    setIsPlaying(false);
  };

  return (
    //container
    <div className='container'>
      {/* heading */}
      <p className='heading'>Music Player</p>
      {/* main container */}
      <div className="main">
        <p className='heading-main'>Add Songs To Playlist</p>
      {/* input box for the song */}
      <input type="file" id="musicFile" accept="audio/*" onChange={handleFileChange} />
      <p className='heading-main'>Player</p>
      {/* player for the song  */}
      <audio className='audio' ref={songsrc} controls />
      {/* reset playlist if we want to make a new playlist */}
      <div className="reset-playlist">
      <button onClick={handleDestroyStorage}>Reset Play List</button>
      </div>
     
      <p className='heading-main'>Playlist(click on the song to play)</p>
      <ul>
        {playlist.map((song, index) => (
          <li key={song.id} onClick={() => playSong(index)}>
            {song.name}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default MusicPlayer;
