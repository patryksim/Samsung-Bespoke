<template>
  <progress-item :y="y">
    <div>
      <div>
        <img :src="imgurl" alt="progress-img">
      </div>
      <div>
        <p>{{subtitle}}</p>
        <h6>{{energy}} kWh</h6>
        <div><div></div></div>
      </div>
    </div>
    <div v-if="isShow" class="msgbox" ref="alertPopup">
      <span class="msg_box_icon">
        <img src="/images/smartthings/43inch-energy-msgbox-tip.png" alt="" />
      </span>
      <p>70%(WM), 30%(REF), 40%(EHS) energy saved</p>
    </div>
  </progress-item>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { ref } from 'vue';

const ProgressItem = styled('div', { barwidth: Number, color: String })`
  display: flex;
  align-items: center;
  position: absolute;
  left: 50%;
  flex-direction: column;
  ${({ y }) => vw('top', y)};
  transform: translateX(-50%);

  > .msgbox {
    display: flex;
    width: calc(100% - -5vw);
    ${vw('margin-top', 20)};
    ${vw('padding', [30, 0])};
    ${vw('bottom', 15)};
    align-items: center;
    background: rgba(0, 0, 0, 0.8);
    ${vw('border-radius', 26)};
    z-index: 999;
    opacity: 1;

    .msg_box_icon {
      flex: 0 0 auto;
      ${vw('width', 120)}

      img {
        display: block;
        margin: 0 auto;
        ${vw('width', 50)}
        height: auto;
      }
    }

    > p {
      flex: 1 1 auto;
      color: #fff;
      ${vw('font-size', 20)};
      font-family: "SamsungSharpSans";
      font-weight: 700;
      font-style: normal;
      letter-spacing: normal;
      line-height: 1.4;
      &.center {
        text-align: center;
      }
      &.left {
        text-align: left;
      }
    }
  }

  > .ShowInteraction {
    animation: hide 1.5s forwards;
  }

  > div {
    ${vw('padding', 35)};
    ${vw('border-radius', 15)};
    border: 1px solid ${({ theme }) => theme.colors.transparentWhite};
    background: ${({ theme }) => theme.colors.darkTransparentWhite};
    display: flex;

    > div:nth-child(1) {
      ${vw('width', 50)};
      ${vw('height', 45)};
      ${vw('margin-right', 15)};
      background: ${({ theme }) => theme.colors.transparentWhite};
      border-radius: 50%;
      display: flex;
      align-items: center;

      > img {
        ${vw('width', 35)};
        ${vw('height', 35)};
        margin: 0 auto;
      }
    }

    > div:nth-child(2) {
      width: 100%;

      > h6 {
        ${vw('font-size', 32)};
        line-height: 1;
        color: ${({ theme }) => theme.colors.white};
        ${vw('margin-top', 5)};
      }

      > p {
        ${vw('font-size', 14)};
        color: ${({ theme }) => theme.colors.white};
      }

      > div{
        position: relative;
        ${vw('width', 480)};
        ${vw('height', 15)};
        ${vw('border-radius', 10)};
        background: ${({ theme }) => theme.colors.white};
        ${vw('margin-top', 20)};

        > div {
          position: absolute;
          height: 100%;
          background: ${({ theme, color }) => theme.charts[color]};
          ${vw('border-radius', 10)};
          transition: width 1s;
          width: ${({ barwidth }) => barwidth}%;
        }
      }
    }
  }
`;

export default {
  props: {
    energy: {
      type: Number,
      default: 0,
    },
    subtitle: {
      type: String,
    },
    imgurl: {
      type: String,
    },
    y: {
      type: Number,
      default: 0,
    },
    close: {
      type: Boolean,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: { ProgressItem },
  setup(props) {
    const alertPopup = ref(null);
    const getTime = () => {
      const $target = alertPopup.value;
      if ($target) {
        if (props.close) {
          $target.classList.add('ShowInteraction');
          $target.classList.remove('HideInteraction');
          $target.style.opacity = 0;
        } else {
          $target.classList.add('HideInteraction');
          $target.classList.remove('ShowInteraction');
          $target.style.opacity = 1;
        }
      }
    };

    return {
      ProgressItem,
      alertPopup,
      getTime,
    };
  },
};
</script>
