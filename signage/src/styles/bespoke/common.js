import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const PanelPosition = styled.div`
  li {
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .door-4 {
    li {
      width: 49.12%;

      &:nth-of-type(1), &:nth-of-type(2) { top: -1.15%; height: 53.03%; }
      &:nth-of-type(3), &:nth-of-type(4) { bottom: 3.48%; height: 42.05%; }
      &:nth-of-type(1), &:nth-of-type(3) { left: 0.4%; }
      &:nth-of-type(2), &:nth-of-type(4) { right: 0.25%; }
    }
  }

  .door-2 {
    li {
      width: 98%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .door-1 {
    li {
      width: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .door-2 {
    li:nth-of-type(1) { top: -1.2%; height: 56.3%; }
    li:nth-of-type(2) { bottom: 3.93%; }
    li {
      left: 49.9%;
    }
  }

  .door-1 {
    li { top: -1.28%; }
  }
`;

const SelectInterior = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
  font-family: 'SamsungSharpSans';
  animation: productFadeIn .5s;
  > h3 {
    ${vw('font-size', 48)}
    ${vw('padding', [144, 96])}
    font-weight: bold;
  }
  > img {
    max-width: 100%;
  }
  > p {
    ${vw('font-size', 32)}
    ${vw('padding-top', 32)}
  }
`;

const InteriorProductPosition = styled(PanelPosition)`
  position: relative;
  ${vw('margin-bottom', -2.88)}
  > img {
    max-width: 100%;
  }
  > div.fridge {
    position: absolute;
    bottom: 18.75%;
    right: 67.9%;
    height: 47.7%;
    display: flex;
    justify-content: flex-start;
    > div {
      position: relative;
      :nth-child(3) {
        ${vw('right', -0.5)}
      }
      > img {
        ${({ theme }) => `
            ${vw('outline', [0.5, 'solid', theme.colors.darkGray])}
            background: ${theme.colors.darkGray};
        `}
      }
      &::before {
        content: '';
        display: inline-block;
        width: 80%;
        ${vw('height', 16)}
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: rgb(0, 0, 0) 0px 2px 12px, rgba(0, 0, 0, 0.22) 0px 0px 10px;
      }
      :not(:first-child) {
        ::after {
          content: '';
          display: inline-block;
          ${vw('width', 2.16)}
          height: 97.4%;
          position: absolute;
          ${vw('left', -1.5)}
          top: 0;
          background-color: #6e6e6e;
        }
      }
      :nth-child(2) {
        ::after {
          ${vw('left', -1.1)}
        }
      }
      :not(:last-child) {
        ${vw('margin-right', 0.05)}
      }
      > img {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }
  }
  .door-4 {
    :before {
      ${vw('bottom', 2.4)}
    }
    li {
      &:nth-of-type(1), &:nth-of-type(2) { top: 0.3%; }
      &:nth-of-type(3), &:nth-of-type(4) { bottom: 2.03%; }
    }
  }
  .door-2 {
    :before {
      ${vw('bottom', 4)}
    }
    li {
      left: 50%;
    }
    li:nth-of-type(1) { top: 0.3%; }
    li:nth-of-type(2) { bottom: 1.25%; }
  }
  .door-1 {
    :before {
      ${vw('bottom', 3.2)}
    }
    li { top: 0.29%; }
  }
  .door-slim {
    li {
      ${vw('width', 45.307)}
      left: 50%;
    }
  }
`;

export { PanelPosition, SelectInterior, InteriorProductPosition };
