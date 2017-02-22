import React, { Component } from "react"

import formatCurrency from "./format-currency"

const defaultConfig = {
  locale: "en-US",
  formats: {
    number: {
      USD: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
};

class IntlCurrencyInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maskedValue: "",
    }
  }

  componentDidMount() {
    this.setState({
      maskedValue: formatCurrency(0, this.props.config, this.props.currency),
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(nextProps === this.props && nextState === this.state);
  }

  normalizeValue = str => {
    // strips everything that is not a number (positive or negative).
    return Number(str.replace(/[^0-9-]/g, ""))
  };

  handleChange = event => {
    event.preventDefault();

    // value must be divided by 100 to work with cents.
    const value = this.normalizeValue(event.target.value) / 100;
    const maskedValue = formatCurrency(value, this.props.config, this.props.currency);

    this.setState({
      maskedValue,
    });

    if (this.props.onChange) {
      this.props.onChange(event, value, maskedValue);
    }
  };

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleKeyPress = event => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }
  };

  render() {
    return(
      <input value={this.state.maskedValue}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
        onKeyUp={this.handleKeyPress}
     />
    );
  }
};

IntlCurrencyInput.propTypes = {
  currency: React.PropTypes.string.isRequired,
  config: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func,
  onBlur: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onKeyPress: React.PropTypes.func,
};

IntlCurrencyInput.defaultProps = {
  currency: "USD",
  config: defaultConfig,
};

export default IntlCurrencyInput;
