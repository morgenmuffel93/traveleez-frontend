import React, { Component } from 'react';
import { LocationsConsumer } from "../providers/LocationsProvider";
import places from '../locations'

class Transport extends Component {
	state = {
		location: '',
		isLoading: true,
	}

	componentDidMount() {
		this.setState({
			isLoading: false,

		})
	}

	render() {
		const { isLoading } = this.state;
		if (isLoading) {
			return <div>isLoading</div>
		}
		return (
			<LocationsConsumer>
				{location => {
					return places.map((place, index) => {
						if (place.name.toLowerCase() === location) {
							console.log(place.name)
							return <div key={index} className="place-info-container">
									<h2>Taxi</h2>
									<p>{place.taxi}</p>
									<h2>Bus</h2>
									<p>{place.bus}</p>
								
									<h2>Train</h2>
									<p>{place.train}</p>
	

								</div>
							
						}
						return place
					})

				}}

			</LocationsConsumer>
		);
	}
}

export default Transport;