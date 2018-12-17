import React, { Component } from 'react';
import axios from 'axios'

class Scan extends Component {
        state = {
            cats: [],
            dogs: {x: 0, y: 0},
            isLoading: true,
        }
    
    componentDidMount(){
            let catList = []
            
            let randomNumber = 0
            for(let i =0; i <6; i++){
                let cat = {x:0, y:0}
            randomNumber = Math.floor(Math.random() * 500);
            cat.x = randomNumber + 75;
            cat.y = randomNumber + 100;
            catList.push(cat);
            console.log(cat)
        }
        console.log(catList)
    
        this.setState({
            cats: catList,
            isLoading: false,
        })
      

    }
    
  

  

  render() {
    
    const {cats} = this.state
    if(this.state.isLoading){
        return <div>is Loading . . .</div>
    }
    return (
      <section className="home-sick">
        <div className='cat-container'>
        {cats.map((cat, index) => {
                return <img key={index} src={`https://placekitten.com/${cat.x}/${cat.y}`} />
        })}
        
        </div>
        
     
      </section>
    );
  }
}

export default Scan;
