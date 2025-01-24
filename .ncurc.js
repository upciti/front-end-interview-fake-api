module.exports = {
  reject: [],
  target: name => {
    const targets = {
      '@types/node': 'minor',
      '@nestjs/*': 'minor',
    };

    const keys = Object.keys(targets);
    if (keys.some(key => new RegExp(key).test(name))) {
      return targets[keys.find(key => new RegExp(key).test(name))];
    }

    return 'latest';
  },
};
