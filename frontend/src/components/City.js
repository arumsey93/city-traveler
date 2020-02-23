import React from 'react'
import { gql } from 'apollo-boost';
import DeleteCity from './DeleteCity';
import UpdateCity from './EditCity';

const CITIES_QUERY = gql`
    query City ($filter: String) {
        city(filter: $filter) {
            id
            createdAt
            name 
            description
        }
    }
`;

const Cities = (props) => {
    
    if(props.loading) return <p>Loading...</p>;
    if(props.error) return <p>Error :(</p>;
    if(props.networkStatus === 4) return <p>Refetching...</p>;

    return props.data.cities.sort((a,b) => a.name.localeCompare(b.name)).map(({ id, name, description }) => (
        <div className="city-card mb-3 p-4" key={ id } style={{
          backgroundColor: `#d3d3d347`,
          borderRadius: `5px`,
        }}>
            <DeleteCity 
                id={ id } 
                deleteCity={props.deleteCity}
                filter={props.filter} />
            <UpdateCity 
                id={ id } 
                name={ name } 
                description={ description.split(', ') } 
                filter={ props.filter }
                />
            <h1 className="mb-3">{name}</h1>
            <p><strong>description: </strong></p>
        </div>
    ))
}

export { CITIES_QUERY };
export default Cities;