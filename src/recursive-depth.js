const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    if (!Array.isArray(arr)) {
      return 0;
    }

    return 1 + arr.reduce((maxDepth, item) => {
      if (Array.isArray(item)) {
        const depth = this.calculateDepth(item);
        return Math.max(maxDepth, depth);
      }
      return maxDepth;
    }, 0);
  }
}

module.exports = {
  DepthCalculator
};
