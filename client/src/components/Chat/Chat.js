import React,{Component,useEffect} from 'react'
import Icon from './icons/user-profile.png'
import Send from './icons/send.png'
import './Chat.css'

class Chat extends React.Component{
    render(){
        return (
            <div>
                <section id="chatApp" class="chatApp">
                    <div class="chatApp__loaderWrapper">
                        <div class="chatApp__loaderText">Loading...</div>
                        <div class="chatApp__loader"></div>
                    </div>
                </section>
            </div>
        )
    }
}
/* detect url in a message and add a link tag */
function detectURL(message) {
	var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
	return message.replace(urlRegex, function(urlMatch) {
		return '<a href="' + urlMatch + '">' + urlMatch + '</a>';
	})
}
/* ========== */
/* Title component */
class Title extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={"chatApp__convTitle"}>{this.props.owner}'s display</div>
		);
	}
}
/* end Title component */
/* ========== */

/* ========== */
/* InputMessage component - used to type the message */
class InputMessage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleSendMessage = this.handleSendMessage.bind(this);
		this.handleTyping = this.handleTyping.bind(this);
	}
	handleSendMessage(event) {
		event.preventDefault();
		/* Disable sendMessage if the message is empty */
		if( this.messageInput.value.length > 0 ) {
			this.props.sendMessageLoading(this.ownerInput.value, this.ownerAvatarInput.value, this.messageInput.value);
			/* Reset input after send*/
			this.messageInput.value = '';
		}
	}
	handleTyping(event) {
		/* Tell users when another user has at least started to write */
		if( this.messageInput.value.length > 0 ) {
			this.props.typing(this.ownerInput.value);
		}
		else {
			/* When there is no more character, the user no longer writes */
			this.props.resetTyping(this.ownerInput.value);
		}
	}
	render() {
		/* If the chatbox state is loading, loading class for display */
		var loadingClass = this.props.isLoading ? 'chatApp__convButton--loading' : '';
		let sendButtonIcon = <i alt='send' Icon={Send} className={"material-icons"}/>	;
		return (
			<form onSubmit={this.handleSendMessage}>
				<input
					type="hidden"
					ref={owner => (this.ownerInput = owner)}
					value={this.props.owner}
				/>
				<input
					type="hidden"
					ref={ownerAvatar => (this.ownerAvatarInput = ownerAvatar)}
					value={this.props.ownerAvatar}
				/>
				<input
					type="text"
					ref={message => (this.messageInput = message)}
					className={"chatApp__convInput"}
					placeholder="Text message"
					onKeyDown={this.handleTyping}
					onKeyUp={this.handleTyping}
					tabIndex="0"
				/>
				<div className={'chatApp__convButton ' + loadingClass}  onClick={this.handleSendMessage}>
				{sendButtonIcon}
				</div>
			</form>
		);
	}
}
/* end InputMessage component */
/* ========== */

/* ========== */
/* TypingIndicator component */
class TypingIndicator extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let typersDisplay = '';
		let countTypers = 0;
		/* for each user writing messages in chatroom */
		for ( var key in this.props.isTyping ) {
			/* retrieve the name if it isn't the owner of the chatbox */
			if( key != this.props.owner && this.props.isTyping[key] ) {
				typersDisplay += ', ' + key;
				countTypers++;
			}
		}
		/* formatting text */
		typersDisplay = typersDisplay.substr(1);
		typersDisplay += (( countTypers > 1 ) ? ' are ' : ' is ');
		/* if at least one other person writes */
		if ( countTypers > 0 ) {
			return (
				<div className={"chatApp__convTyping"}>{typersDisplay} writing
				<span className={"chatApp__convTypingDot"}></span>
				</div>
			);
		}
		return (
			<div className={"chatApp__convTyping"}></div>
		);
	}
}
/* end TypingIndicator component */
/* ========== */

/* ========== */
/* MessageList component - contains all messages */
class MessageList extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className={"chatApp__convTimeline"}>
			{this.props.messages.slice(0).reverse().map(
				messageItem => (
					<MessageItem
						key={messageItem.id}
						owner={this.props.owner}
						sender={messageItem.sender}
						senderAvatar={messageItem.senderAvatar}
						message={messageItem.message}
					/>
				)
			)}
			</div>
		);
	}
}
/* end MessageList component */
/* ========== */

/* ========== */
/* MessageItem component - composed of a message and the sender's avatar */
class MessageItem extends React.Component {
	render() {
		/* message position formatting - right if I'm the author */
		let messagePosition = (( this.props.owner == this.props.sender ) ? 'chatApp__convMessageItem--right' : 'chatApp__convMessageItem--left');
		return (
			<div className={"chatApp__convMessageItem " + messagePosition + " clearfix"}>
				<img src={this.props.senderAvatar} alt={this.props.sender} className="chatApp__convMessageAvatar" />
				<div className="chatApp__convMessageValue" dangerouslySetInnerHTML={{__html: this.props.message}}></div>
			</div>
		);
	}
}
/* end MessageItem component */
/* ========== */

/* ========== */
/* ChatBox component - composed of Title, MessageList, TypingIndicator, InputMessage */
class ChatBox extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isLoading: false
		};
		this.sendMessageLoading = this.sendMessageLoading.bind(this);
		var timeout = null;
	}
	/* catch the sendMessage signal and update the loading state then continues the sending instruction */
	sendMessageLoading(sender, senderAvatar, message) {
		this.setState({ isLoading: true });
		this.props.sendMessage(sender, senderAvatar, message);
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 400);
	}
	render() {
		return (
			<div className={"chatApp__conv"}>
				<Title
					owner={this.props.owner}
				/>
				<MessageList
					owner={this.props.owner}
					messages={this.props.messages}
				/>
				<div className={"chatApp__convSendMessage clearfix"}>
					<TypingIndicator
						owner={this.props.owner}
						isTyping={this.props.isTyping}
					/>
					<InputMessage
						isLoading={this.state.isLoading}
						owner={this.props.owner}
						ownerAvatar={this.props.ownerAvatar}
						sendMessage={this.props.sendMessage}
						sendMessageLoading={this.sendMessageLoading}
						typing={this.props.typing}
						resetTyping={this.props.resetTyping}
					/>
				</div>
			</div>
		);
	}
}
/* end ChatBox component */
/* ========== */

/* ========== */
/* ChatRoom component - composed of multiple ChatBoxes */
class ChatRoom extends React.Component {
	constructor(props, context) {
		super(props, context);
		console.log(`message ${this.props.message} socket : ${this.props.socket}`);		
		this.state = {
			name:this.props.name,
			streamerId:this.props.streamerId,
			socket:this.props.socket,
			messages: [
			// {
			// 	id: 1,
			// 	sender: 'Shun',
			// 	senderAvatar: 'https://i.pravatar.cc/150?img=32',
			// 	message: 'Hello 👋'
			// },
			// {
			// 	id: 2,
			// 	sender: 'Gabe',
			// 	senderAvatar: 'https://i.pravatar.cc/150?img=56',
			// 	message: 'Hey!'
			// },
			// {
			// 	id: 3,
			// 	sender: 'Gabe',
			// 	senderAvatar: 'https://i.pravatar.cc/150?img=56',
			// 	message: 'How are you?'
			// },
			// {
			// 	id: 4,
			// 	sender: 'Shun',
			// 	senderAvatar: 'https://i.pravatar.cc/150?img=32',
			// 	message: 'Great! It\'s been a while... 🙃'
			// },
			// {
			// 	id: 5,
			// 	sender: 'Gabe',
			// 	senderAvatar: 'https://i.pravatar.cc/150?img=56',
			// 	message: 'Indeed.... We\'re gonna have to fix that. 🌮🍻'
			// }
			],
			isTyping: [],
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.typing = this.typing.bind(this);
		this.resetTyping = this.resetTyping.bind(this);
	}
	/* adds a new message to the chatroom */
	sendMessage(sender, senderAvatar, message) {		
		setTimeout(() => {
			let messageFormat = detectURL(message);
			let newMessageItem = {
				id: this.state.messages.length + 1,
				sender: sender,
				senderAvatar: senderAvatar,
				message: messageFormat
			};console.log(`sendMessage ${message} :: ${this.props.socket}`);
			if(message && this.props.socket){			
				console.log(`message ${message} socket : ${this.props.socket} room : ${this.state.streamerId} name : ${this.state.name}`);	
				this.props.socket.emit('sendMessage', {message:message,streamerId:this.state.streamerId,name:this.state.name},()=>{
					this.setState({ messages: [...this.state.messages, newMessageItem] });
					this.resetTyping(sender);
				})				
			}
		}, 400);
	}
	/* updates the writing indicator if not already displayed */
	typing(writer) {
		if( !this.state.isTyping[writer] ) {
			let stateTyping = this.state.isTyping;
			stateTyping[writer] = true;
			this.setState({ isTyping: stateTyping });
		}
	}
	/* hide the writing indicator */
	resetTyping(writer) {
		let stateTyping = this.state.isTyping;
		stateTyping[writer] = false;
		this.setState({ isTyping: stateTyping });
	}
	render() {
		let users = {};
		let chatBoxes = [];
		let messages = this.state.messages;
		let isTyping = this.state.isTyping;
		let sendMessage = this.sendMessage;
		let typing = this.typing;
		let resetTyping = this.resetTyping;
		return (

			<ChatBox
			// key={key}
			owner={this.props.name}
			ownerAvatar={Icon}
			sendMessage={sendMessage}
			typing={typing}
			resetTyping={resetTyping}
			messages={messages}
			isTyping={isTyping}
			/>
		);
	}
}
/* end ChatRoom component */
export default ChatRoom

 

// function Chat({ message,messages,name,setMessage,sendMessage }) {
//     let {text,user}=message;
//     let isSentByCurrentUser = false;
//     if(user === name) {
//         isSentByCurrentUser = true;
//     }
//     const [allmessage, setAllMessage] = uMeState([]);
//     useEffect(() => {
//         messages.map((mess)=>{
//             <MessageBox
//                 position={isSentByCurrentUser ? 'right' : 'left'}
//                 type={'text'}
//                 text={'react.svg'}
//                 data={{
//                     uri: 'https://facebook.github.io/react/img/logo.svg',
//                     status: {
//                         click: false,
//                         loading: 0,
//                     }
//             }}/>
//             setAllMessage.push()
//             return 
//         })
//     }, [message])
//     return (
//         <div>
//            <MessageList
//                 className='message-list'
//                 lockable={true}
//                 toBottomHeight={'100%'}
//                 dataSource={[
//                     {
//                         position: 'right',
//                         type: 'text',
//                         text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
//                         date: new Date(),
//                     },
//             ]} /> 
//         </div>
//     )
// }

// export default Chat
