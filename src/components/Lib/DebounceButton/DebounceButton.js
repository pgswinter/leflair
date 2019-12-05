import React from 'react';
import ClickableElement from './components/ClickableElement';

class DebounceButton extends ClickableElement {
  render() {
    return (
      <button className="btn btn-icon" onClick={e => this.onElementClicked(e)}>{this.props.value}</button>
    );
  }
}

export default DebounceButton;