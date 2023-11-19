<template>
  <indicator :qrcode="qrcode && qrcodeSrc">
    <div>
      <ul>
        <li :class="{active: step > 0}">{{$t('common.interior')}}</li>
        <li :class="{active: step > 1}">{{$t('common.product')}}</li>
        <li :class="{active: step > 2}">{{$t('common.color')}}</li>
        <li :class="{active: step > 3}">{{$t('common.preview')}}</li>
      </ul>
      <div>
        <div :style="{ width: `${(step - 1 < 0 ? 0 : step - 1) * 33}%` }"></div>
      </div>
    </div>
    <p v-html="$t(title)"></p>
    <img v-if="qrcode" :src="qrcodeSrc" alt="">
  </indicator>
</template>

<script>
import styled, { css } from 'vue3-styled-components';
import QR from 'qrcode';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { vw } from '@styles/mixin';

const borderStyle = css`
  content: '';
  display: inline-block;
  position: absolute;
  ${vw('height', 2.4)}
  ${vw('top', 86.4)}
`;
console.log(borderStyle);

const Indicator = styled('div', { darkmode: Boolean, qrcode: Boolean })`
  width: 80%;
  margin: 0 auto;
  color: white;
  text-align: center;
  font-family: 'SamsungSharpSans';
  position: relative;
  ${vw('padding-top', 56)}
  > div {
    width: 80%;
    margin: 0 auto;
    > ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      ${vw('margin-bottom', 10)}
      li {
        width: 25%;
        text-align: center;
        position: relative;
        :before {
          content: '';
          display: inline-block;
          position: absolute;
          left: 50%;
          ${vw('bottom', -15)}
          transform: translateX(-50%);
          ${vw('width', 8)}
          ${vw('height', 8)}
          background-color: ${({ theme }) => theme.colors.disabled};
          transition: 0.7s all;
          transition-delay: 0.7s;
          border-radius: 50%;
        }
        &.active:before {
          background-color: ${({ theme }) => theme.colors.white};
        }
      }
    }
    > div:nth-child(2) {
      ${vw('width', 350)}
      margin: 0 auto;
      ${vw('height', 3)}
      background-color: ${({ theme }) => theme.colors.disabled};
      > div {
        height: 100%;
        background-color: ${({ theme }) => theme.colors.white};
        transition: 0.7s all;
      }
    }
  }
  > p {
    ${vw('font-size', 51.2)}
    font-weight: bold;
    ${({ darkmode, theme }) => darkmode && `
      color: ${theme.colors.black};
    `}
    ${vw('padding', [48, 0, 48])}
    ${({ qrcode }) => qrcode && `
      text-align: left;
    `}
  }
  > img {
    position: absolute;
    ${vw('width', 56)}
    right: -10%;
    transform: translateX(-50%);
    bottom: 20%;
  }
`;

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    qrcode: {
      type: Boolean,
      default: false,
    },
  },
  components: { Indicator },
  setup(props) {
    const qrcodeSrc = ref(null);
    const generateQr = async (url) => QR.toDataURL(url);

    onMounted(async () => {
      if (!props.qrcode) return;

      const { data } = await axios.get('/qrcode.json');

      if (data.url.length) {
        qrcodeSrc.value = await generateQr(data.url);
      }
    });

    return {
      qrcodeSrc,
    };
  },
};
</script>
