module.exports = {
  reject: [],
  target: name => {
    const targets = {
      '@types/node': 'minor',
      /**
       * breaking changes
       */
      '@nestjs/*': 'minor',
      /**
       * v3 requires node >=20, keeping v2.x
       */
      'sort-package-json': 'minor',
    };

    const keys = Object.keys(targets);
    if (keys.some(key => new RegExp(key).test(name))) {
      return targets[keys.find(key => new RegExp(key).test(name))];
    }

    return 'latest';
  },
};
