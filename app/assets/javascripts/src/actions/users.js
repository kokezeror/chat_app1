import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getUsers() {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.USERS}`)
        .set('X-CSRF-Token', CSRFToken())
        .end((err, res) => {
          if (!err && res.ok) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_USERS,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  searchUsers(searchString) {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.USERS}/search`)
        .set('X-CSRF-Token', CSRFToken())
        .send({searchString})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.SEARCH_USERS,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },

  getFriends() {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.FRIENDS}`)
        .set('X-CSRF-Token', CSRFToken())
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_FRIENDS,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  sendFriendRequest(userId) {
    return new Promise((resolve, reject) => {
      request
        .post('/friend_requests')
        .set('X-CSRF-Token', CSRFToken())
        .send({friend_id: userId})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  deleteFriends(friendId) {
    return new Promise((resolve, reject) => {
      request
        .delete(`${APIEndpoints.FRIENDS}/${friendId}`)
        .set('X-CSRF-Token', CSRFToken())
        .send({id: friendId})
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_FRIENDS,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
}
