const Util = {
  randomVec (length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  inherits (childClass, parentClass) {
    childClass.prototype = Object.create(parentClass.prototype);
  },

  wrap (coord, max) {
    if (coord < 0) {
      return max - (coord % max);
    } else if (coord > max) {
      return coord % max;
    } else {
      return coord;
    }
  },

  dist(pos1, pos2) {
    return Math.sqrt(((pos1[0] - pos2[0]) * (pos1[0] - pos2[0]))
    + ((pos1[1] - pos2[1]) * (pos1[1] - pos2[1])));
  }
};

module.exports = Util;
