import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CITIES_QUERY } from './City';
import CityBuilder from './CityBuilder';

const UPDATE_CITY = gql`
    mutation UpdateCity($id: String! $name: String! $description: String!) {
        updateCity(id: $id name: $name $description: $$description) {
            id
            name
            description
        }
    }
`;

const UpdateCity = (props) => {
    const [editCity] = useMutation(UPDATE_CITY);
    const [updateCity, setUpdateCity] = useState({name: props.name, description: description});
    const [showEditForm, setShowEditForm] = useState(false);

    const submitCityUpdate = (e) => {
        e.preventDefault();
        if(props.id !== undefined) {
            editCity({ 
                variables: { 
                    id: props.id, 
                    name: updateCity.title, 
                    description: updateCity.description
                }, 
                refetchQueries: [{ query: CITIES_QUERY, variables: { filter: props.filter } }]
            });
            return setShowEditForm(false);
        }
        else return "Error: unknown ID";
    }
    
    if(!showEditForm) {
        return (
            <button className="btn btn-outline-secondary float-right mr-2" onClick={ () => setShowEditForm(true)}>Edit</button>
        );
    }
    else return (
        <CityBuilder 
            city={updateCity}
            setCity={setUpdateCity}
            handleSubmit={submitCityUpdate}
            buttonText="Update City"
        />
    );
}

export default UpdateCity;