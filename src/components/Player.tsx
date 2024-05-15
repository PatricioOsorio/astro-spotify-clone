import React, { useEffect, useRef } from "react";
import { useState } from "react";

const PauseIcon = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

const PlayIcon = () => (
  <svg
    data-encore-id="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    width="16"
    height="16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current!.src = "/music/1/01.mp3";
  }, []);

  const hadleClick = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current!.play();
    }

    setIsPlaying(!isPlaying);
  };
  const hadlePlay = () => {};

  return (
    <div className="z-50 flex w-full  flex-row justify-between px-4 ">
      <div>current song...</div>

      <div className="grid flex-1 place-content-center gap-4">
        <div className="flex justify-center">
          <button className="rounded-full bg-white p-2" onClick={hadleClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center"></div>

      <audio ref={audioRef} />
    </div>
  );
}
