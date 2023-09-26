"use client";

import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import useSound from "use-sound";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { MdOpenInFull } from "react-icons/md";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";

import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";
import Link from "next/link";
import DialogPlayer from "./DialogPlayer";
import MediaPlayer from "./MediaPlayer";
import useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const imageUrl = useLoadImage(song);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
      sound.fade(100, 0);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-2">
        <DialogPlayer>
          <MediaPlayer data={song} className="flex-col">
            <div className="flex flex-col items-center justify-center w-full mt-20">
              <div className="relative w-[320px] h-[320px] shadow-lg">
                <Image
                  fill
                  src={imageUrl || "/images/liked.png"}
                  className="object-cover shadow-lg"
                  alt="Media Item"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-10 px-1">
                <div className="truncate">
                  <p className="text-2xl font-bold">{song.title}</p>
                  <p className="text-neutral-400 font-medium">{song.author}</p>
                </div>
                <div className="ml-6">
                  <LikeButton songId={song.id} />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-x-7">
              <AiFillStepBackward
                onClick={onPlayPrevious}
                size={30}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
              />
              <div
                onClick={handlePlay}
                className="flex items-center justify-center h-10 w-10 rounded-full bg-white cursor-pointer p-1"
              >
                <Icon size={50} className="text-black" />
              </div>
              <AiFillStepForward
                onClick={onPlayNext}
                size={30}
                className="text-neutral-400 cursor-pointer hover:text-white transition"
              />
            </div>
            <div className="bg-[#D8672A] p-5 py-2 rounded-lg mt-10">
              <div className="flex items-center justify-between mt-3">
                <h2 className="font-bold text-2xl">Lyrics</h2>
                <Link href={"/lyrics"}>
                  <div className="flex items-center gap-x-2 bg-[#6B3311] py-2 px-3 rounded-full">
                    <p className="text-xs uppercase">More</p>
                    <MdOpenInFull size={14} />
                  </div>
                </Link>
              </div>
              <div>
                <p className="mt-10">
                  {song.lyrics ? (
                    <p className="leading-relaxed font-bold text-2xl">
                      {song?.lyrics}
                    </p>
                  ) : (
                    <p className="leading-relaxed font-bold text-2xl md:text-3xl md:leading-relaxed lg:leading-relaxed lg:text-4xl">
                      Lyrics not found
                    </p>
                  )}
                </p>
                <p className="text-black font-semibold mt-10">
                  Posted by: {song.creator_song ? song.creator_song : "Unknown"}
                </p>
              </div>
            </div>
          </MediaPlayer>
        </DialogPlayer>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-white cursor-pointer p-1"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <Link href="/lyrics">
            <LiaMicrophoneAltSolid size={20} />
          </Link>
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
