import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';

const ListItem = ({ name, phoneNumber, id, imgUrl, onEdit, onRemove }) => (
	<li>
		<i className="fas fa-user-secret"></i>
		<span> {name}, Tel: {phoneNumber}</span>
    <span className='control'>
      <i className="far fa-edit" onClick={function(e){e.preventDefault(); onEdit(name, phoneNumber, imgUrl)}}></i>
      <i className="fas fa-times" onClick={() => onRemove(id)}/>
    </span>
	</li>
)

ListItem.propTypes = {
  name: PropTypes.string,
  phoneNumber: PropTypes.string,
  imgUrl: PropTypes.string,
  id: PropTypes.string,
  onRemove: PropTypes.func,
}

ListItem.defaultProps = {
  name: '',
  phoneNumber: '',
  imgUrl: '',
  id: '0',
  onRemove: () => {},
}

export default ListItem;