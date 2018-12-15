
import React, { Component } from 'react';
import SpeechToText from 'speech-to-text';


class SpeechToTextDemo extends Component {
	state = {
		error: '',
		interimText: '',
		finalisedText: [],
		listening: false
	};

	componentDidMount() {
		const onAnythingSaid = text => {
			this.setState({ interimText: text });
		};

		const onEndEvent = () => {
			if (this.state.listening) {
				this.startListening();
			}
		};

		const onFinalised = text => {
			this.setState({
				finalisedText: [text, ...this.state.finalisedText],
				interimText: ''
			});
		};

		try {
			this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
		} catch (error) {
			this.setState({ error: error.message });
		}
	}

	startListening = () => {
		try {
			this.listener.startListening();
			this.setState({ listening: true });
		} catch (err) {
			console.log('yoyoy');
			console.log(err);
		}
	};

	stopListening = () => {
		this.listener.stopListening();
		this.setState({ listening: false });
	};

	render() {
		const { error, interimText, finalisedText, listening } = this.state;
		const { classes } = this.props;

		let content;
		if (error) {
			content = (
				<p>	{error}	</p>
			);
		} else {
			let buttonForListening;

			if (listening) {
				buttonForListening = (
					<button onClick={() => this.stopListening()}>
						Stop Listening
          </button>
				);
			} else {
				buttonForListening = (
					<button onClick={() => this.startListening()}>
						Start Listening
          </button>
				);
			}
			content = (

				<div>
					<p>Status: {listening ? 'listening...' : 'finished listening'}
							{buttonForListening}
					</p>
					<p>
							Current utterances
							{interimText}
					</p>


					<p>
						<div>
							<div>
						
									<div>Finalised Text</div>

							</div>
							<div>
								{finalisedText.map((str, index) => {
									return (
										<div key={index}>
												{str}
										</div>
									);
								})}
							</div>
						</div>
					</p>
				</div>

			);
		}

		return (
			<div>
				{content}
			</div>

		);
	}
}

export default SpeechToTextDemo;