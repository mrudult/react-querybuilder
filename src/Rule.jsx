import React from 'react';

export default class Rule extends React.Component {
  static get defaultProps() {
    return {
      id: null,
      parentId: null,
      fact: null,
      operator: null,
      value: null,
      schema: null
    };
  }

  render() {
    const {
      fact,
      operator,
      value,
      translations,
      schema: { fields, controls, getOperators, getLevel, classNames }
    } = this.props;
    const level = getLevel(this.props.id);
    return (
      <div className={`rule ${classNames.rule}`}>
        {React.createElement(controls.fieldSelector, {
          options: fields,
          title: translations.fields.title,
          value: fact,
          className: `rule-fields ${classNames.fields}`,
          handleOnChange: this.onFieldChanged,
          level: level
        })}
        {React.createElement(controls.operatorSelector, {
          fact,
          title: translations.operators.title,
          options: getOperators(fact),
          value: operator,
          className: `rule-operators ${classNames.operators}`,
          handleOnChange: this.onOperatorChanged,
          level: level
        })}
        {React.createElement(controls.valueEditor, {
          fact,
          title: translations.value.title,
          operator: operator,
          value: value,
          className: `rule-value ${classNames.value}`,
          handleOnChange: this.onValueChanged,
          level: level
        })}
        {React.createElement(controls.removeRuleAction, {
          label: translations.removeRule.label,
          title: translations.removeRule.title,
          className: `rule-remove ${classNames.removeRule}`,
          handleOnClick: this.removeRule,
          level: level
        })}
      </div>
    );
  }

  onFieldChanged = (value) => {
    this.onElementChanged('value', '');
    this.onElementChanged('operator', '');
    this.onElementChanged('fact', value);
  };

  onOperatorChanged = (value) => {
    this.onElementChanged('operator', value);
  };

  onValueChanged = (value) => {
    this.onElementChanged('value', value);
  };

  onElementChanged = (property, value) => {
    const {
      id,
      schema: { onPropChange }
    } = this.props;

    onPropChange(property, value, id);
  };

  removeRule = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.props.schema.onRuleRemove(this.props.id, this.props.parentId);
  };
}
