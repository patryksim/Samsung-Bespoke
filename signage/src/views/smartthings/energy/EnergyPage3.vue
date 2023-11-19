<template>
  <energy-mode>
    <div class="energy_header">
      <h1 class="energy_title">SmartThings Energy</h1>
      <p class="energy_sub-title">AI Energy mode</p>
    </div>
    <div class="energy_content">
      <ul>
        <li class="energy_type">
          <img class="energy_item" src="/images/smartthings/energy-content-1.png" alt="" />
          <div class="energy_type_content">
            <p class="energy_type-title">Refrigerator</p>
            <p class="energy_type-info">
              Save <span class="green">30%</span> energy by learning user pattern <br />
              and optimazing temperature <br />
              and compressor control *
            </p>
          </div>
        </li>
        <li class="energy_type">
          <img class="energy_item" src="/images/smartthings/energy-content-2.png" alt="" />
          <div class="energy_type_content">
            <p class="energy_type-title">Washing Machine</p>
            <p class="energy_type-info">
              Save <span class="green">70%</span> energy by reducing heat energy <br />
              while keeping effective washing <br />
              by Ecobubble™ **
            </p>
          </div>
        </li>
        <li class="energy_type">
          <img class="energy_item" src="/images/smartthings/energy-content-3.png" alt="" />
          <div class="energy_type_content">
            <p class="energy_type-title">Eco Heating System (EHS)</p>
            <p class="energy_type-info">
              Save <span class="green">40%</span> energy by leargning user pattern <br />
              and optimazing temperature <br />
              and compressor control ***
            </p>
          </div>
        </li>
      </ul>
      <div class="energy_desc_wrapper">
        <div class="energy_desc">
          <p class="energy_desc-title">Refrigerator *</p>
          <p class="energy_desc-info">
            Availble for specific models from Dec.2022 through wifi update.  Test results derived from comparing factory setting temperature <br />
            with AI Energy mode to without AI Energy mode. Results may vary depending on the usage condition and pattern
          </p>
        </div>
        <div class="energy_desc">
          <p class="energy_desc-title">Washing Machine **</p>
          <p class="energy_desc-info">
            Based on internal testing on the WW11BBA049AB model in normal usage conditions.
            Results: Annual power consumption without AI Saving = 88.7KWh. <br />
            Annual power consumption with AI Saving = 31.5KWh. Results may vary depending on the actual usage conditions
          </p>
        </div>
        <div class="energy_desc">
          <p class="energy_desc-title">EHS ***</p>
          <p class="energy_desc-info">
            Comparison of total power consumption per day for domestic hot water: Base 3.562 kWh, Saving Mode 2.137 kWh, saving about 40%
          </p>
        </div>
      </div>
    </div>
  </energy-mode>
</template>

<script>
import { vw } from '@/styles/mixin';
import styled from 'vue3-styled-components';

const EnergyMode = styled.div`
  > .energy_header {
    ${vw('padding', [82, 0, 55])};
    background-color: #dcebff;
    text-align: center;

    >.energy_title {
      color: #000;
      ${vw('font-size', 46)}
      font-family: 'SamsungSharpSans';
      font-weight: bold;
      font-style: normal;
      letter-spacing: 0.009em;
    }

    >.energy_sub-title {
      ${vw('margin-top', 39)};
      color: #000;
      ${vw('font-size', 33)}
      font-family: 'SamsungSharpSans';
      font-weight: 500;
      font-style: normal;
    }
  }

  .energy_content {
    ${vw('padding', [60, 55])}

    .energy_type {
      display: flex;

      :nth-child(2),
      :nth-child(3) {
        ${vw('margin-top', 40)}
      }

      .energy_item {
        ${vw('width', 193)}
      }

      .energy_type_content{
        display: flex;
        ${vw('padding-left', 25)}
        flex-direction: column;
        justify-content: center;

        .energy_type-title {
          ${vw('margin-bottom', 30)}
          color: #000;
          ${vw('font-size', 28)}
          font-family: 'SamsungSharpSans';
          font-weight: 500;
          font-style: normal;
        }

        .energy_type-info {
          color: #000;
          ${vw('font-size', 20)}
          font-family: 'SamsungSharpSans';
          font-weight: 500;
          font-style: normal;
          .green {
            color: #56b033;
            ${vw('font-size', 24)}
          }
        }
      }
    }
  }

  .energy_desc_wrapper {
    ${vw('margin-top', 60)};
    .energy_desc {
      :nth-child(2),
      :nth-child(3) {
        ${vw('margin-top', 10)};
      }

      .energy_desc-title {
        opacity: 0.5;
        color: #1d1d1b;
        ${vw('font-size', 10)}
        font-family: 'SamsungSharpSans';
        font-weight: 500;
        font-style: normal;
      }

      .energy_desc-info {
        ${vw('margin-top', 7)};
        opacity: 0.5;
        color: #1d1d1b;
        ${vw('font-size', 8)}
        font-family: 'SamsungSharpSans';
        font-weight: 500;
        font-style: normal;
      }
    }
  }
`;

export default {
  components: { EnergyMode },
  setup() {
  },
};
</script>
