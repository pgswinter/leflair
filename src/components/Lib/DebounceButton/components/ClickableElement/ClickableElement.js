import React from 'react';
import { debounce, isFunction } from 'lodash';

class ClickableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { onClick, disabled } = nextProps;
    this.setState({
      onClick,
      disabled,
    });
  }
  onClickDebounced(e) {
    const { onClick, disabled } = this.state;
    if (!disabled && isFunction(onClick)) {
      onClick(e);
    }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
    const { clickWait } = this.props;
    const wait = clickWait || 1000;
    this.onElementClicked = debounce(this.onClickDebounced,
       wait,
      {
        maxWait:wait,
        leading: true,
        trailing: false,
      });
  }
};

export default ClickableElement
