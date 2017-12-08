import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  GET_MSGS: null,
  POST_MSGS: null,
  GET_USERS: null,
  SEARCH_USERS: null,
  GET_FRIENDS: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  RELATIONSHIPS: APIRoot + '/relationships',
}
