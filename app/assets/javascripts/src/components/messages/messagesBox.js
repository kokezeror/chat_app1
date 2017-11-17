import React from 'react'
// import classNames from 'classNames'
import Msgs from '../../stores/Msgs'
import ReplyBox from '../../components/messages/replyBox'
// // import UserStore from '../../stores/user'
// import Utils from '../../utils'

class MessagesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      messages: Msgs.getMsgs,
    }
    // return MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())   // 変更しろ！（openchat関連）
  }
  componentWillMount() {
    Msgs.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    Msgs.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UserStore.user.id

    // const messages = .map((message, index) => {
    // //   const messageClasses = classNames({
    // //     'message-box__item': true,
    // //     'message-box__item--from-current': true,
    // //     'clear': true,
    // //   })
    // // //
    // //   return (
    // //       <li key={ message.timestamp + '-' + message.from } className={ messageClasses }>
    // //         <div className='message-box__item__contents'>
    // //           { message.contents }
    // //         </div>
    // //       </li>
    // //     )
    // })
    // //
    // const lastMessage = this.state.messages[messagesLength - 1]
    //
    // // if (lastMessage.from === currentUserID) {
    // if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //   const date = Utils.getShortDate(lastMessage.timestamp)
    // messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //
    //           </div>
    //         </li>
    //       )

  return (
        <div className='message-box'>
          <ul className='message-box__list'>

          </ul>
          <ReplyBox />,
        </div>
      )
}
}

export default MessagesBox
