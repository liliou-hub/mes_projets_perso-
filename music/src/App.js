import React from 'react'
import { useState, useEffect } from 'react';
import Player from './components/Player.js'

function AppMusic() {
  const [songs] = useState([
    {
      title: "Nao me Toca",
      artist: "Anselmo Ralph",
      img_src: "./img/ans.jpg",
      src: "./songs/ans.mp3"
    },
    {
      title: "Back at Once",
      artist: "Brian McKnight",
      img_src: "./img/brian.jpg",
      src: "./songs/brian.mp3"
    },
    {
      title: "All of me",
      artist: "John Legend",
      img_src: "./img/jon.jpg",
      src: "./songs/jon.mp3"
    },
    {
      title: "Thinking oud Loud",
      artist: "Ed Sheeran",
      img_src: "./img/ed.jpg",
      src: "./songs/ed.mp3"
    }

  ])

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);


  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className="app">
      <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />
    </div>
  );

}

export default AppMusic;
