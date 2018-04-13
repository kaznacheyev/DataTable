import React from 'react';

const FilterBar = ({data, handleFilter, filterQuery, onPageChange}) => {

    const dataSearch = e => {
        const value = e.target.value.toLowerCase();
    
        const filter = data.filter(user => {
          return user[1].toLowerCase().includes(value);
        });
        handleFilter(filter, value);
        
    };

    return (
        <div className="searchbar form-group">
            <input
                value={filterQuery}
                type="text"
                className="form-control"
                placeholder="Search people by name..."
                onChange={dataSearch}
            />
        </div>
    );
}

export default FilterBar;