import React, { PropTypes } from 'react';

const Row = ({children}) => <div className="row">{children}</div>;

Row.propTypes = {
  children: PropTypes.array.isRequired
};

export default Row;
