import _includes from 'lodash/collection/includes';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _typeFilter(item) {
    if (!_includes(this.props.condition.type, item.type)) {
      return false;
    }
    return true;
  }

  _familyFilter(item) {
    if (item.family.includes('虎徹')) {
      item.family = '虎徹';
    }
    if (item.family === '-') {
      item.family = 'その他';
    }

    if (!_includes(this.props.condition.family, item.family)) {
      return false;
    }
    return true;
  }

  _rareFilter(item) {
    if (!_includes(this.props.condition.rare, item.rare)) {
      return false;
    }
    return true;
  }

  _namesFilter(item) {
    if (!_includes(this.props.condition.names, item.name)) {
      return false;
    }
    return true;
  }
}

export default BaseComponent;
