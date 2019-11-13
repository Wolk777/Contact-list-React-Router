import React from 'react';
import PropTypes from 'prop-types';
import DataField from '../datafield/DataField';
import './Form.css';
import {withRouter, Link} from 'react-router-dom';

const Form = (props) => {
  // console.log(props)
  return(
    <form className="form">
      <Link to={'/'} className='home'><i className="fas fa-home"></i></Link>
      <h2>{props.title}</h2>
      <DataField 
        name='name' 
        title='First Name' 
        value={props.nameText} 
        onChange={props.onChangeName}
        placeholder='First Name'/>
      <DataField 
        name='phone' 
        title='Mobile Phone' 
        value={props.phoneText} 
        onChange={props.onChangePhone}
        placeholder='375-(XX)-XXX-XX-XX'/>
      <DataField 
        name='photo' 
        title='Photo/URL' 
        value={props.photoUrl} 
        onChange={props.onChangePhoto}
        placeholder='link to the photo: "https://..."'/>
      <p className="containerBtn">
      <button className="BtnAdd" onClick={props.onAdd}>Save</button>
      </p>
    </form>
  );
}

Form.propTypes = {
  nameText: PropTypes.string,
  phoneText:PropTypes.string,
  photoUrl:PropTypes.string,
  onChange:PropTypes.func,
  onAdd:PropTypes.func,
}

Form.defaultProps = {
  nameText: '',
  phoneText:'',
  photoUrl:'',
  onChange: () => {},
  onAdd: () => {},
}

export default withRouter(Form) 