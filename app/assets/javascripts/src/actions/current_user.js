import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  getCurrentUser() {
    return new Promise((resolve, reject) => {
      request
        .get(`${APIEndpoints.CURRENT_USER}`)
        .end((error, res) => {
          if (!error && res.status === 200) {
            const json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_CURRENT_USER,
              json,
            })
            resolve(json)
            // console.log(json)
          } else {
            reject(res)
          }
        })
    })
  },
}
