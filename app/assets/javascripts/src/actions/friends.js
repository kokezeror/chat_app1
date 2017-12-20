import Dispatcher from '../dispatcher'
import request from 'superagent'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
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
            // console.log(json)
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },

  sendFriendRequest(userId) { // userId という情報をこのアクションの中に投入してくれ
    return new Promise((resolve, reject) => {
      request
        .post('/friend_requests')
        .set('X-CSRF-Token', CSRFToken())
        .send({friend_id: userId}) // followed_id という名前でuserIdという名の情報を渡せ
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            console.log(json)
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