var _ = {
  includes: require('lodash/collection/includes')
}

module.exports = {
  FiltersMixin: {
    _typeFilter: function(item) {
      if (!_.includes(this.props.condition.type, item.type)) {
        return false;
      }
      return true;
    },
    _familyFilter: function(item) {
      if (item.family.indexOf("虎徹") > -1) {
        item.family = "虎徹";
      }
      if (item.family == "-") {
        item.family = "その他";
      }
      if (!_.includes(this.props.condition.family, item.family)) {
        return false;
      }
      return true;
    },
    _rareFilter: function(item) {
      if (!_.includes(this.props.condition.rare, item.rare)) {
        return false;
      }
      return true;
    },
    _namesFilter: function(item) {
      if (!_.includes(this.props.condition.names, item.name)) {
        return false;
      }
      return true;
    }
  }
}
