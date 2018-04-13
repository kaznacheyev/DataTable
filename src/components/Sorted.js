import React from 'react';

class Sorted extends React.Component {

    sortedDir = {
        sortDirect: true
    };
  
    handleSort = (id) => {
        const { data, initRows, handleSorted } = this.props;
        const sortDirect = this.sortedDir['sortDirect'];
        let direction = sortDirect ? 1 : -1;
        let sorted = [...initRows];
        sorted.sort((a, b) => {
            if (a[id] === b[id]) { return 0; }
            return a[id] < b[id] ? direction : direction * -1;
        });
        this.sortedDir['sortDirect'] = !sortDirect;
        handleSorted(sorted);
    }
  
    render() {
        const { row } = this.props;
        return (
            <tr key={row[0]}>
                {row.map((value, id) => <th onClick={() => this.handleSort(id)} key={value}>{value}</th>)}
            </tr>
        );
    }
}

export default Sorted;