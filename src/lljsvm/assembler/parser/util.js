const asType = (type) => (value) => ({ type, value });
const mapJoin = (parser) => parser.map((items) => items.join(""));

export default {
  asType,
  mapJoin,
};
