import React from 'react'
import _ from 'lodash'
import UserStore from '../stores/userStore'
import UsersAction from '../actions/users'
// import { withRouter } from 'react-router-dom'
// import Utils from '../../utils'

export default class UserIndex extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {user: UserStore.getUsers()}
    // return {user: UserStore.getSearchUsers()}
  }

  componentDidMount() {
    UserStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    UserStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  onClickHandler(userId){
  // onClick(userId) { // onClick のevent には user.id (camelcase で記載)を渡す
    // e.preventDefault()
    UsersAction.followUsers(userId)
    window.location.href = '/'
  }

  render() {
    const {user} = this.state
    console.log(user);
      // stores the data from the userStore (this.state) as the users property
    const {searchString} = this.props
      // stores the typed letters (this.props) in the searchString property
    let allUsers = user
    const searchUser = searchString.trim().toLowerCase()   // whats the meaning of this code?

    if (searchUser.length > 0) {
      allUsers = _.filter(allUsers, (user) => {
        return user.name.toLowerCase().match(searchUser)
      })
    } else {
      return null
    }

    return (
      <ul className='search_list'>
        {
          _.map(allUsers, (user) => {
            return (
              <div className='userIndex' key={user.id}>
                <li>
                  <div onClick={this.onClickHandler.bind(this, user.id)}>
                    <input name='user_id' key={user.id} type='hidden' />
                    <input type='submit' value={user.name} id='users' />
                  </div>
                </li>
              </div>
            )
          })
        }
      </ul>
    )
  }
}

// line 68 <form onClick={this.onClick.bind(this, user.id)}> => onClick で user.id の情報をeventに渡してくれ
// line 69<input name='user_id' key={user.id} type='hidden' />  ここで渡されてる情報は user.id (key より)
