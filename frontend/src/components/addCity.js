import React from 'react';
import '../App.css';
import { gql } from 'apollo-boost';
import { CITIES_QUERY } from './City';
import CityBuilder from './CityBuilder';

const ADD_CITY = gql`
    mutation AddCity($name: String! $description: String!) {
        addCity(name: $name description: $$description) {
            id
            name
            description
        }
    }
`;

const AddCity = (props) => {

    const submitCity = (e) => {
        e.preventDefault();
        if(props.city.name !== '' && props.city.description !== []) {
            props.addCity({ 
                variables: { 
                    name: props.city.name, 
                    description: props.city.description.map(i => i.name).join(", ")
                }, 
                refetchQueries: [{ query: CITIES_QUERY, variables: { filter: props.filter } }]
            });
            props.setCity({name: '', description: []})
            return props.setShowAddForm(false);
        }
        else return "Error: missing name or description.";
    }
    
    if(!props.showAddForm) {
        return(
            <button type="button" className="btn btn-outline-primary mb-4" onClick={ () => props.setShowAddForm(true)}>New City</button>
        );
    }
    else return (
        <CityBuilder 
            city={props.city}
            setCity={props.setCity}
            handleSubmit={submitCity}
            buttonText="Add City"
        />
    )
}

export default AddCity;
export {ADD_CITY};