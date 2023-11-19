import socket from '@/api/socket';
import { ref } from 'vue';

export default function PlayedVideo() {
  const isPlayed = ref(false);

  const getPlayed = () => isPlayed.value;

  const setPlayed = (isplay) => {
    isPlayed.value = isplay;
  };

  const playVideo = (src) => {
    if (isPlayed.value === false) {
      socket.emit(src);
    }
  };

  return {
    setPlayed,
    playVideo,
    getPlayed,
  };
}
