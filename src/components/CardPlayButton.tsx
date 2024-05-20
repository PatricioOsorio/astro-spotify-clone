import { PlayIcon, PauseIcon } from "./Player";
import { usePlayerStore } from "@/store/PlayerStore";

export function CardPlayButton({
  id,
  size = "small",
}: {
  id?: string;
  size: "small" | "large";
}) {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist: boolean =
    isPlaying && currentMusic?.playlist.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;

        setIsPlaying(true);
        setCurrentMusic({ songs, playlist, song: songs[0] });

        console.log({ songs, playlist });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 transition hover:scale-105 hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <PauseIcon className={iconClassName} />
      ) : (
        <PlayIcon className={iconClassName} />
      )}
    </button>
  );
}
