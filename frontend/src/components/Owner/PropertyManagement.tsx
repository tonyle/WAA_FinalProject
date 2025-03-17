import React, { useState } from 'react';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([{
    name:"Test",status:"pending"
  }]);

  return (
    <div>
      <h1>Property Management</h1>
      <button>Add New Property</button>
      <ul>
        {properties.map((property, index) => (
          <li key={index}>
            {property.name} - {property.status}
            <button>Edit</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyManagement;
