<template>
  <div>
    <slide-banner-wrapper>
      <carousel :items-to-show="1">
        <slide v-for="(slide, index) in slideImg" :key="slide">
          <div>
            <img :src="slide.image" alt="slide-img" draggable="false" onmousedown="return false"/>
            <slide-banner-text>
              <div v-html="slide.title"></div>
            </slide-banner-text>
            <slide-banner-pagination>
              <p>{{index + 1}} / {{ slideImg.length }}</p>
            </slide-banner-pagination>
          </div>
        </slide>
      </carousel>
    </slide-banner-wrapper>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';
import { Carousel, Slide } from 'vue3-carousel';

const SlideBannerWrapper = styled.div`
  position:relative;

  .carousel__slide {
    width: 100%;
  }

  & img {
    width: 100%;
    height: auto;
    position:relative;
  }
`;

const SlideBannerText = styled.div`
  position: absolute;
  ${vw('top', 70)}
  ${vw('left', 15)}
  text-align: left;
  font-weight: 700;
  ${vw('font-size', 17)}
`;

const SlideBannerPagination = styled.p`
  position: absolute;
  ${vw('bottom', 30)};
  ${vw('left', 15)};
  ${vw('padding', [3, 7])};
  background : ${({ theme }) => theme.colors.lightTransparentBlack};
  ${vw('border-radius', 15)};
  color: ${({ theme }) => theme.colors.white};
`;

export default {
  props: {
    prev: {
      type: Boolean,
      default: false,
    },
    prevTitle: {
      type: String,
      required: true,
    },
    rightIcon: {
      type: String,
    },
  },
  components: {
    SlideBannerWrapper,
    SlideBannerText,
    SlideBannerPagination,
    Carousel,
    Slide,
  },
  setup() {
    return {
      slideImg: [
        {
          image: '/images/samples/NaturalWoody.jpg',
          title: 'Bailey was inactive from<br>2:00 PM to 3:45 PM.',
        },
        {
          image: '/images/samples/ModernWhite.jpg',
          title: 'Bailey was inactive from<br>2:00 PM to 3:45 PM.',
        },
      ],
      // slideImg: ['/images/samples/NaturalWoody.jpg', '/images/samples/ModernWhite.jpg'],
      slickOptions: {
        slideToShow: 1,
        slideToScroll: 1,
        speed: 500,
      },
    };
  },
};

</script>
