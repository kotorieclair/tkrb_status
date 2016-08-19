const _getItemAndCondition = (_item, _condition, key) => {
  const item = _item[key] || _item;
  const condition = _condition[key] || _condition;
  return { item, condition };
};

const _defaultFilter = (item, condition) => {
  return condition.indexOf(item) !== -1;
};

export default {
  type: (_item, _condition) => {
    const { item, condition } = _getItemAndCondition(_item, _condition, 'type');
    return _defaultFilter(item, condition);
  },

  family: (_item, _condition) => {
    const { item, condition } = _getItemAndCondition(_item, _condition, 'family');
    const family = item.match(/虎徹/) && '虎徹' || item === '-' && 'その他' || item;
    return _defaultFilter(family, condition);
  },

  rare: (_item, _condition) => {
    const { item, condition } = _getItemAndCondition(_item, _condition, 'rare');
    return _defaultFilter(item, condition);
  },

  name: (_item, _condition) => {
    const { item, condition } = _getItemAndCondition(_item, _condition, 'name');
    return _defaultFilter(item, condition);
  },
};
