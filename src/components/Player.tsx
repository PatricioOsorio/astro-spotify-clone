import React, { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/PlayerStore";
import { Slider } from "./Slider";

export const PauseIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
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

export const PlayIcon = ({ className }: { className: string }) => (
  <svg
    className={className}
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

export const VolumeSilentIcon = () => (
  <svg
    aria-hidden="true"
    id="volume-icon"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path>
    <path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path>
  </svg>
);

export const VolumeIcon = () => (
  <svg
    aria-hidden="true"
    id="volume-icon"
    viewBox="0 0 16 16"
    height="16"
    width="16"
    fill="currentColor"
  >
    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
  </svg>
);

const CurrentSong = ({
  image,
  title,
  artists,
}: {
  image: string;
  title: string;
  artists: string[];
}) => {
  return (
    <div className="relative flex  items-center gap-3 overflow-hidden">
      <picture className="h-16 w-16 overflow-hidden rounded-md bg-zinc-800 shadow-lg">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="block text-sm font-semibold">{title}</h3>
        <span className="text-sm opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
};

const SongControls = ({
  audio,
}: {
  audio: React.RefObject<HTMLAudioElement>;
}) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio?.current?.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio?.current?.currentTime || 0);
  };

  const formatTime = (time: number) => {
    if (time === null) return "0:00";

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-xs">
      <span className="w-12 text-right opacity-50 ">
        {formatTime(currentTime)}
      </span>

      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          if (audio?.current) {
            audio.current.currentTime = newCurrentTime || 0;
          }
        }}
      />

      <span className="w-12 opacity-50  ">
        {duration ? formatTime(duration) : null}
      </span>
    </div>
  );
};

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);

  const isVolumeSilent = volume < 0.1;
  const handleVolume = () => {
    if (isVolumeSilent) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button
        onClick={handleVolume}
        className="opacity-80 transition hover:opacity-100"
      >
        {isVolumeSilent ? <VolumeSilentIcon /> : <VolumeIcon />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-24"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export function Player() {
  const { currentMusic, isPlaying, setIsPlaying, volume } = usePlayerStore(
    (state) => state,
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current!.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist, songs } = currentMusic;
    if (song) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current!.src = src;
      audioRef.current!.volume = volume;
      audioRef.current?.play();
    }
  }, [currentMusic]);

  const hadleClick = () => {
    setIsPlaying(!isPlaying);
  };
  const hadlePlay = () => {};

  return (
    <div className="z-50 flex w-full  flex-row justify-between px-4 ">
      <div className="w-[350px]">
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid flex-1 place-content-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <button className="rounded-full bg-white p-2" onClick={hadleClick}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <SongControls audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
