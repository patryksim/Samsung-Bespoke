const shapes = {
  lShape: {
    name: "L-Shaped Kitchen",
    icon: "/images/samples/icon-l-shape.png",
    i18n: "interior.lShape",
  },
  uShape: {
    name: "U-Shaped Kitchen",
    icon: "/images/samples/icon-u-shape.png",
    i18n: "interior.uShaped",
  },
  straitShape: {
    name: "Straight Kitchen",
    icon: "/images/samples/icon-straight.png",
    i18n: "interior.straight",
  },
  parallelShape: {
    name: "Parallel Kitchen",
    icon: "/images/samples/icon-parallel.png",
    i18n: "interior.parallel",
  },
};

module.exports = [
  {
    name: "Natural & Woody",
    number: 1,
    id: "NaturalWoody",
    i18n: "interior.naturalWoody",
    image: {
      default: "/images/samples/NaturalWoody.jpg",
    },
    shape: shapes.lShape,
  },
  {
    name: "Modern & White",
    number: 2,
    id: "ModernWhite",
    i18n: "interior.modernWhite",
    image: {
      default: "/images/samples/ModernWhite.jpg",
    },
    shape: shapes.parallelShape,
  },
  {
    name: "Modern & Gray",
    number: 3,
    id: "ModernGray",
    i18n: "interior.modernGray",
    image: {
      default: "/images/samples/ModernGray.jpg",
    },
    shape: shapes.lShape,
  }
];
