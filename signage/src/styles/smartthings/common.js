import styled from 'vue3-styled-components';
import { vw } from '../mixin';

const Wrapper = styled.div`
  & img {
    height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};
    position:absolute;
    left:50%;
    top: 0;
    z-index: 0;
    transform:translateX(-50%);
  }
`;

const PageWrapper = styled.div`
  overflow: hidden;
`;

const PageImg = styled.div`
  > img {
    height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};
    position:relative;
    left:50%;
    transform:translateX(-50%);
  }
`;

const PageLink = styled.div`
  position:absolute;
  bottom: 0;
  width: 100%;
  ${vw('height', 175)}
`;

const PageSide = styled.div`
  position:absolute;
  width: 100%;
  z-index: 998;
  > img {
    width: 100%;
    height: 100%;
  }
`;

export { Wrapper, PageWrapper, PageImg, PageLink, PageSide };
