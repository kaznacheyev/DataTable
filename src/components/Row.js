import React from 'react';

const Row = ({row, handleActiveRow}) => (
    <tr onClick={() => handleActiveRow(row[0] - 1)} key={row[0]}>
        {row.map(value => <td key={value}>{value}</td>)}
    </tr>
)

export default Row;