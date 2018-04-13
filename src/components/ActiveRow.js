import React from 'react';

import Row from './Row';

const ActiveRow = ({ data, id }) => {
  if (!data || !data[id]) { return <h3>No row selected!</h3>; }

  const dataRow = data[id];

  return (
        <table className="row-info table">
          <tbody>
            <tr>
                {dataRow.map(value => <td key={value}>{value}</td>)}
            </tr>
          </tbody>
        </table>
  );
};

export default ActiveRow;