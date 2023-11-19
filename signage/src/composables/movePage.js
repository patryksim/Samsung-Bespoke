import router from '@/router';
import socket from '@/api/socket';

const movePage = (name, timer, param) => {
  if (!timer) {
    if (param) {
      router.push({ name, query: param });
    } else {
      router.push({ name });
    }

    socket.emit(`${name}`);
  } else {
    setTimeout(() => {
      router.push({ name });
    }, timer);
  }
};

export default movePage;
