export default {
  type: (item, condition) => {
    if (condition.type.indexOf(item.type) === -1) {
      return false;
    }
    return true;
  },

  family: (item, condition) => {
    if (item.family.includes('虎徹')) {
      item.family = '虎徹';
    }
    if (item.family === '-') {
      item.family = 'その他';
    }

    if (condition.family.indexOf(item.family) === -1) {
      return false;
    }
    return true;
  },

  rare: (item, condition) => {
    if (condition.rare.indexOf(item.rare) === -1) {
      return false;
    }
    return true;
  },

  name: (item, condition) => {
    if (condition.names.indexOf(item.name) === -1) {
      return false;
    }
    return true;
  },
};
