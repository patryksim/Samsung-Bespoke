import styled from 'vue3-styled-components';
import { vw } from '../mixin';

const commonCss = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  > div {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    align-items: flex-end;
    .product-item {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      width: 100%;
      > img {
        max-width: 100%;
      }
    }
  }
`;

export default {
  mwo: styled(commonCss)`
    bottom: 40.7%;
    right: 52%;
    width: 6.5%;
    height: 11.6%;
  `,
  stick: styled(commonCss)`
    bottom: 14.7%;
    left: 17.5%;
    width: 7%;
    height: 30%;
    .product-item {
      height: 100%;
      img {
        height: 100%;
      }
    }
  `,
  induction: styled(commonCss)`
    bottom: 42.6%;
    left: 51.0%;
    width: 9.5%;
    height: 14.71%;
    transform: scale(0.856);
    .product-item {
      height: 100%;
      &:after {
        content: "";
        position: absolute;
        z-index: 0;
        top: 90%;
        ${vw('left', 26)}
        ${vw('width', 15)}
        ${vw('height', 15)}
        transform: rotate(45deg);
        background-color: #fff;
        z-index: -1;
      }
      img {
        position: relative;
        width: 100%;
        height: 100%;
        ${({ theme }) => `
          ${vw('outline', [4, 'solid', theme.colors.white])}
        `}
      }
    }
  `,
  jetbot: styled(commonCss)`
    bottom: 13.9%;
    left: 12%;
    width: 7%;
    height: 18.6%;
  `,
  oven: styled(commonCss)`
    bottom: 35%;
    left: 32.74%;
    width: 7.8%;
    height: 26.6%;
    > div {
      align-items: flex-start;
      > div {
        align-items: flex-start;
      }
    }
    .product-item {
      ${({ theme }) => vw('border', [1, 'solid', theme.colors.disabled])}
      :nth-child(1) {
        &.NQ7000B {
          ${vw('margin-top', -60)}
        }
        &.NV7000B {
          ${vw('margin-bottom', -4)}
        }
      }
      :nth-child(2) {
        ${vw('margin-bottom', -5)}
        position: relative;
        ${vw('bottom', 1)}
      }
    }
  `,
  acr: styled(commonCss)`
    bottom: 7%;
    right: 29%;
    width: 8.2%;
    height: 27%;
  `,
  washer: styled(commonCss)`
    bottom: 15.5%;
    right: 42.5%;
    width: 9.85%;
    height: 27%;
    z-index: 1;
    .product-item {
      > img {
        ${({ theme }) => `
          ${vw('border', [1, 'solid', theme.colors.darkGray])}
          box-sizing: border-box;
        `}
      }
    }
  `,
  dryer: styled(commonCss)`
    bottom: 40.7%;
    right: 42.5%;
    width: 9.85%;
    height: 27%;
    z-index: 0;
    .product-item {
      position: relative;
      > img {
        ${({ theme }) => `
          ${vw('border', [1, 'solid', theme.colors.darkGray])}
          box-sizing: border-box;
        `}
      }
    }
  `,
  airdresser: styled(commonCss)`
    bottom: 15.52%;
    left: 37.8%;
    width: 9.4%;
    height: 54.9%;
    .product-item {
      height: 100%;
      img {
        height: 100%;
        background-color: #44413f;
        ${({ theme }) => `
            ${vw('border', [1, 'solid', theme.colors.darkGray])}
            box-sizing: border-box;
        `}
        &.DF9000RM {
          width: 100%;
        }
      }
    }
  `,
  dishwasher: styled(commonCss)`
    bottom: 19%;
    left: 60.4%;
    width: 8.05%;
    height: 20.2%;
    .product-item {
      width: 100%;
      height: 100%;
      position: relative;
      .delete {
        position: absolute !important;
        left: 0;
        top: 0;
        transform: translateX(-50%) translateY(-50%) !important;
      }
      img {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        height: 100%;
        ${({ theme }) => `
            ${vw('border', [1, 'solid', theme.colors.darkGray])}
            box-sizing: border-box;
        `}
        &.small-dw {
          height: auto;
        }
      }
    }
  `,
};
