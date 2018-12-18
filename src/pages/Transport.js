import React, { Component } from 'react';


class Transport extends Component {
        state = {
            location: '',
            isLoading: true,
        }
    
    componentDidMount(){
           
        this.setState({
            isLoading: false,
        })
    }
    
  

  

  render() {

    if(this.state.isLoading){
        return <div>is Loading . . .</div>
    }
    return (
      <section className="transport">

        <h2>Taxi:</h2>
        <p>{this.state.location}</p>
        <h2>Train:</h2>
        <p>{this.state.location}</p>
        <h2>Bus:</h2>
        <p>{this.state.location}</p>

       
     
      </section>
    );
  }
}

export default Transport;
