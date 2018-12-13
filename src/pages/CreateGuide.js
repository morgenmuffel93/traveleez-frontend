import React, { Component } from 'react';

class CreateGuide extends Component {
  render() {
    return (
      <section className="create-edit-section">
        <div className="create-edit-form-container">
        <h2>Create guide</h2>
          <form action="" className="create-edit-form">
            <input type="text" placeholder="Title" name="" className="create-edit-input"/>
            <input type="text" placeholder="Date" name="" className="create-edit-input" />
            <input type="text" placeholder="Time" name="" className="create-edit-input" />
            <input type="text" placeholder="Description" name="" className="create-edit-input desc" />
            <input type="text" placeholder="Location" name="" className="create-edit-input" />
            <input type="text" placeholder="Expertise" name="" className="create-edit-input" />
            <div className="duration-container">
              <p>Duration:</p>
              <input type="time" placeholder="hh" name="" className="duration-input" />
            </div>
            <button>Create</button>
          </form>
        </div>
      </section>
    );
  }
}

export default CreateGuide;