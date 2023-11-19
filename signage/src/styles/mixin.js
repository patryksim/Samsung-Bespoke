const screenSize = 720;
// electron에 윈도우 화면 전환하는 api가 없어 css로 태블릿인 경우에만 90도 돌려서 사용
const isTablet = window.location.hash.includes('tab') || window.location.hash.includes('smartthings');
// 90도 강제로 돌리면 화면 크기가 달라지므로 vh, vw 다르게 계산
const calcType = process.env.NODE_ENV === 'production' && isTablet ? 'vh' : 'vw';

const calc = (value) => `${(value * (100 / screenSize) * 1).toFixed(4)}${calcType}`;
const vw = (attribute, value) => {
  if (Number.isFinite(value)) {
    return `${attribute}: ${calc(value)};`;
  }

  if (Array.isArray(value)) {
    const itemList = value.map((item) => (Number.isFinite(item) ? calc(item) : item));

    return `${attribute}: ${itemList.join(' ')};`;
  }

  return '';
};

export { vw, calc };
