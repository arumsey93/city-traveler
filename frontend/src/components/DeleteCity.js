import React from 'react';
import { gql } from 'apollo-boost';
import { CITIES_QUERY } from './City';

const DELETE_CITY = gql`
    mutation DeleteCity($id: String!) {
        deleteCity(id: $id)
    }
`;

const DeleteCity = (props) => {
   
    return (
        <button className="btn btn-outline-danger float-right mb-3" onClick={() => 
            {if (window.confirm("Are you sure you want to delete this city?")) props.deleteCity({ 
                variables: { id: props.id }, 
                refetchQueries: [{ query: CITIES_QUERY, variables: { filter: props.filter } }]
            })}
        }>
            Delete</button>
    );
}

export default DeleteCity;
export {DELETE_CITY};