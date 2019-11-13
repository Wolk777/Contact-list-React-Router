import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../listitem/ListItem.jsx';
import './List.css';

const List = ({users, onEdit, onRemove}) => {
  return(
    <ul className="userList">
      {users.map( ({ name, phoneNumber, id, imgUrl}) => 
        <ListItem key={phoneNumber} 
        name={name} 
        phoneNumber={phoneNumber}
        imgUrl={imgUrl} 
        id={id}
        onEdit={onEdit} 
        onRemove={onRemove}/>
      )}
    </ul>
  );
}

List.propTypes = {
  users: PropTypes.array,
  id: PropTypes.string,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
}

List.defaultProps = {
  users: [],
  id: '0',
  onRemove: () => {},
  onEdit: () => {},
}

export default List