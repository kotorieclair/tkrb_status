// import React from 'react';
import _includes from 'lodash/collection/includes';

export default {
  type: (item, condition) => {
    if (!_includes(condition.type, item.type)) {
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

    if (!_includes(condition.family, item.family)) {
      return false;
    }
    return true;
  },

  rare: (item, condition) => {
    if (!_includes(condition.rare, item.rare)) {
      return false;
    }
    return true;
  },

  name: (item, condition) => {
    if (!_includes(condition.names, item.name)) {
      return false;
    }
    return true;
  },
};
