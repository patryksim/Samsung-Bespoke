<template>
  <wrapper>
    <landing-type>
      <landing-title>SmartThings Home</landing-title>
      <landing-list>
        <div class="cooking">
          <img src="/images/smartthings/common-icon-landing-cooking.png" alt="" />
          <h2>Cooking</h2>
          <hr />
          <h4>More enjoyable cooking</h4>
          <p>
            Always there in every step of<br />
            your culinary journey
          </p>
        </div>
        <div class="energy">
          <img src="/images/smartthings/common-icon-landing-energy.png" alt="" />
          <h2>Energy</h2>
          <hr />
          <h4>Save more money</h4>
          <p>
            Manage the energy usage of<br />
            your home appliances and<br />
            save extra money in the process
          </p>
        </div>
        <div class="clothingcare">
          <img src="/images/smartthings/common-icon-landing-clothingcare.png" alt="" />
          <h2>Clothing Care</h2>
          <hr />
          <h4>Keep your clothes pristine</h4>
          <p>
            Experience smarter and<br />
            easier laundry
          </p>
        </div>
        <div class="petcare">
          <img src="/images/smartthings/common-icon-landing-petcare.png" alt="" />
          <h2>Pet Care</h2>
          <hr />
          <h4>Care for your pets</h4>
          <p>
            In home pet care<br />
            even when you’re away
          </p>
        </div>
        <div class="aircare">
          <img src="/images/smartthings/common-icon-landing-aircare.png" alt="" />
          <h2>Air Care</h2>
          <hr />
          <h4>Make home fresher</h4>
          <p>
            Provide integrated Air Quality<br />
            monitoring & Care solution
          </p>
        </div>
        <div class="homecare">
          <img src="/images/smartthings/common-icon-landing-homecare.png" alt="" />
          <h2>Home Care</h2>
          <hr />
          <h4>Diagnose your devices</h4>
          <p>
            AI – Powered<br />
            device care
          </p>
        </div>
      </landing-list>
    </landing-type>
  </wrapper>
</template>

<script>
import styled from 'vue3-styled-components';
import { vw } from '@/styles/mixin';

const Wrapper = styled.div`
  box-sizing: border-box;
`;

const LandingType = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  // min-height: ${process.env.NODE_ENV === 'production' ? '100vw' : '100vh'};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LandingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  ${vw('max-width', 280 * 2)}
  ${vw('margin-top', 40)}

  & > div {
    ${vw('width', 270)}
    ${vw('height', 270)}
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
    ${vw('border-radius', 13)}
    font-family: 'SamsungSharpSans';
    text-align: center;

    :nth-child(1),
    :nth-child(2) {
      ${vw('margin-bottom', 20)}
    }

    :nth-child(3),
    :nth-child(4) {
      ${vw('margin-bottom', 20)}
    }

    :nth-child(odd){
      ${vw('margin-right', 8)}
    }

    :nth-child(even){
      ${vw('margin-left', 8)}
    }

    & > img {
      ${vw('width', 55)}
      ${vw('margin-top', 33)}
    }

    & > h2 {
      ${vw('margin-top', 17)}
      ${vw('font-size', 23)}
      font-weight: 700;
      line-height: 1;
    }

    & > hr {
      width: 80%;
      ${vw('margin-top', 16)}
      border-top: #ddd solid 1px;
    }

    & > h4 {
      ${vw('margin-top', 23)}
      ${vw('font-size', 18)}
      font-weight: 700;
      line-height: 1;
    }

    & > p {
      ${vw('margin-top', 7)}
      ${vw('font-size', 13)}
      line-height: 1.44;
      color: rgba(29, 29, 27, 0.5);
      font-weight: 500;
      letter-spacing: -0.01em;
    }
  }

  & .cooking {
    & > h4 { color: #ff8e52; }
  }
  & .energy {
    & > h4 { color: #4c95da; }
  }
  & .clothingcare {
    & > h4 { color: #009492; }
  }
  & .petcare {
    & > h4 { color: #009975; }
  }
  & .aircare {
    & > h4 { color: #209ec1; }
  }
  & .homecare {
    & > h4 { color: #269ebb; }
  }
`;

const LandingTitle = styled.p`
  text-align: center;
  ${vw('font-size', 48)}
  line-height: 1;
  color: #000;
  font-weight: 700;
  font-family: 'SamsungSharpSans';
`;

export default {
  components: { Wrapper, LandingType, LandingList, LandingTitle },
  setup() {

  },
};
</script>
