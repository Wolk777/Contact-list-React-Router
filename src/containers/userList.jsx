import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';

import { addUser, removeUser, searchUser, editUser } from '../actions/actionCreator';

import List from '../components/list/List';
import SearchField from '../components/searchfield/SearchField';
import Form from '../components/form/Form';

import {Route, Link, Switch, withRouter} from 'react-router-dom';

class UserList extends Component {
  state={
    nameText:'',
    phoneText:'',
    photoUrl:'',
    searchText:'',
  }

  handleNameChange = ({ target: { value } }) => {
    this.setState({
      nameText:value,
    })
  }  

  handlePhoneChange = ({ target: { value } }) => {
    this.setState({
      phoneText:value,
    })
  }  

  handlePhotoChange = ({ target: { value } }) => {
    this.setState({
      photoUrl:value,
    })
  }  

  handleSearchChange = ({ target: { value } }) => {
    this.setState({
      searchText:value,
    })
  }

  addUser = (e) =>{
    e.preventDefault();
    const {nameText, phoneText, photoUrl} = this.state;
    if (nameText === '' || nameText.length < 2 || nameText.length > 15) return;
    if (phoneText === '' || phoneText.length < 10 || phoneText.length > 20) return;
    if (photoUrl === '' || photoUrl.length < 10) return;

    const { addUser, editUser, users } = this.props;
    
    let foundUser = users.find( user => user.id === phoneText);

    if (foundUser) {
      editUser(foundUser.id, nameText, phoneText, photoUrl);
    } else {
      addUser(phoneText.toString(), nameText, phoneText, photoUrl);  
    }
   
    this.setState({
      nameText:'',
      phoneText:'',
      photoUrl:'',
    });

    this.props.history.push('/');
  }

  searchUser = (e) =>{
    e.preventDefault();
    const {searchText} = this.state;
    const { searchUser, users } = this.props;
    searchUser(users, searchText);
    this.setState({searchText:''});
  }

  editUser = (nameText, phoneText, photoUrl) => {
    this.setState({
      nameText:nameText,
      phoneText:phoneText,
      photoUrl:photoUrl,
    });

    this.props.history.push('/form');
  } 

  render(){
    const {nameText, phoneText, photoUrl, searchText} = this.state;
    const { users, foundUsers, removeUser } = this.props;
    return(
      <div className="container">
        <Switch>
          <Route path='/' exact render={() => (
            <Fragment>
              <Link className='addContact' 
                to={'/form'}><i className="fas fa-user-plus">
                </i>Add New Contact</Link>
              <SearchField users={users} 
                searchText={searchText} 
                foundUsers={foundUsers}
                onChange={this.handleSearchChange} 
                onSearch={this.searchUser}/>
              <List users={users} onEdit={this.editUser} onRemove={removeUser}/>
            </Fragment> 
          )} />
          <Route path='/form' render={() => {
            return(<Form title='New Contact'
              nameText={nameText}
              phoneText={phoneText} 
              photoUrl={photoUrl} 
              onChangeName={this.handleNameChange} 
              onChangePhone={this.handlePhoneChange} 
              onChangePhoto={this.handlePhotoChange} 
              onAdd={this.addUser} />
            );}
          } />
          <Route render={() => (<h1 className='notFound'>404 not found</h1>)}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    users: state.users,
    foundUsers: state.foundUsers,
  }
}

const mapDispatchToProps = {
  addUser,
  editUser,
  removeUser,
  searchUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList));