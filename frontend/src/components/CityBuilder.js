import React from 'react';
import uuid from 'uuid';

const CityBuilder = (props) => {
    
    const addDescription = (e) => {
        e.preventDefault();
        props.setCity({...props.city, description: [...props.city.description, {id: uuid.v4(), name: document.getElementById("description").value}]});
        return document.getElementById("description").value = '';
    }

    const removeDescription = (id) => {
        props.setCity({...props.city, description: [...props.city.description.filter(i => i.id !== id)]});
    }

    return (
        <div className="row">
            <div className="col-md-8">
                <form className="mb-4" onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <label for="title">What city did you go to?</label>
                        <input 
                            type="text" 
                            name="title" 
                            value={props.city.title} 
                            onChange={e => props.setCity({...props.city, title: e.target.value})} 
                            className="form-control" />
                    </div>

                    <div className="form-group">
                        <div className="row">
                            <div className="col-10">
                                <label for="description">What did you notice while you where there?</label>
                                <input 
                                    type="text" 
                                    name="description" 
                                    id="description"
                                    className="form-control" />
                            </div>
                            <div className="col-2 add-btn-container">
                                <button className="btn add-btn" onClick={addDescription}>+</button>
                            </div>
                        </div>
                    </div>
               
                    <button className="btn btn-primary" type="submit">{props.buttonText}</button>
                </form>
            </div>
            <div className="col-md-4">
                <p><strong>City: </strong>{props.city.title}</p>
                <p><strong>Description: </strong></p>
                <ul>
                    {props.city.description !== undefined ? props.city.description.map(i => 
                        <li className="mb-3">{i.name}<button className="btn btn-outline-danger remove-btn" onClick={e => removeDescription(i.id)}>x</button></li>) : ''}
                </ul>
            </div>
        </div>
    );
}

export default CityBuilder;