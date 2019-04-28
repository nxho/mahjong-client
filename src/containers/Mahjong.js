import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';

import Board from './Board';
import Chatroom from './Chatroom';
import UsernameForm from './UsernameForm';
import WaitingRoom from '../components/WaitingRoom';

const containerStyle = {
	display: 'flex',
	flexDirection: 'row',
	flex: 1,
	height: window.innerHeight,
};

class Mahjong extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isUsernameFormVisible: true,
		}
	}

	// TODO: initialize socketio event listeners here?? or in index.js vis store.dispatch()?
	componentDidMount() {
		this.props.socket.on('enter_game', (username) => {
			console.log(`Received "enter_game" event from server, new player ${username} joined`);
		});
	}

	hideForm = () => {
		this.setState({
			isUsernameFormVisible: false,
		});
	}

	isEnoughPlayers() {
		return this.props.players.allIds.length >= 4;
	}

	renderUsernameForm() {
		return (
			<div style={containerStyle}>
				<UsernameForm onSubmit={this.hideForm}/>
			</div>
		);
	}

	renderGame() {
		return (
			<div style={containerStyle}>
				{
					(this.isEnoughPlayers() && <Board />) || <WaitingRoom />
				}
				<Chatroom />
			</div>
		);
	}

	render() {
		if (this.state.isUsernameFormVisible) {
			return this.renderUsernameForm();
		}

		return this.renderGame();
	}
}

const mapStateToProps = state => ({
	players: state.players,
	socket: state.socket,
});

const mapDispatchToProps = dispatch => ({
	sendMessage: (message) => dispatch(sendMessage(message)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Mahjong);

