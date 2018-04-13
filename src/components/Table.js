import React from 'react';
import Row from './Row';

import Pagination from './Pagination';
import FilterBar from './FilterBar';
import Sorted from './Sorted';
import ActiveRow from './ActiveRow';

class Table extends React.Component {
    state = {
        initRows: [],
        renderedRows: [],
        filterRows: [],
        filterQuery: "",
        currentPage: 1,
        rowsPerPage: 50,
        activeRow: null,
        total: null
    }

    handleSorted = (sorted) => {
        const {filterRows, currentPage, rowsPerPage} = this.state;
        const data = filterRows.length > 0 ? filterRows : sorted;
        const renderedRows = sorted.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage);
        this.setState({ initRows: sorted, renderedRows });
    }

    handleFilter = (filter, filterQuery) => {
        const {initRows, filterRows, currentPage, rowsPerPage} = this.state;
        const data = filterQuery.length > 0 ? filter : initRows;
        const renderedRows = data.slice(0, rowsPerPage);
        this.setState({ filterRows: data, currentPage: 1, renderedRows, total: data.length, filterQuery });
    }

    handlePaginateChange = (currentPage) => {
        const {initRows, filterRows, rowsPerPage} = this.state;
        const data = filterRows.length > 0 ? filterRows : initRows;
        const renderedRows = data.slice((currentPage - 1) * rowsPerPage, (currentPage - 1) * rowsPerPage + rowsPerPage);
        this.setState({ currentPage, renderedRows });
    }

    componentDidMount = () => {
        const {data} = this.props;
        const {rowsPerPage} = this.state;
        setTimeout(() => {
          this.setState({ initRows: data, renderedRows: data.slice(0, rowsPerPage), total: data.length });
        })
    }

    handleActiveRow = (id) => {
        this.setState({activeRow: id})
    }

    render() {
        const { initRows, renderedRows, filterRows, filterQuery, currentPage, total, rowsPerPage, activeRow } = this.state;
        const rows = renderedRows.map(dataRow => <Row row={dataRow} handleActiveRow={this.handleActiveRow} />);
        return (
            <React.Fragment>
                <Pagination
                    margin={2}
                    page={currentPage}
                    count={Math.ceil(total / rowsPerPage)}
                    onPageChange={this.handlePaginateChange}
                />

                <div className="row">
                    <div className="col-sm-12">
                    <FilterBar
                        data={filterRows.length > 0 ? filterRows : initRows}
                        handleFilter={this.handleFilter}
                        filterQuery={filterQuery}
                        // currentPage={currentPage}
                        total={total}
                    />
                    </div>
                </div>

                <table>
                    <thead>
                        <Sorted
                            row={Object.values(this.props.title)}
                            data={filterRows}
                            initRows={filterRows.length > 0 ? filterRows : initRows}
                            handleSorted={this.handleSorted}
                        />
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>

                <Pagination
                    margin={2}
                    page={currentPage}
                    count={Math.ceil(total / rowsPerPage)}
                    onPageChange={this.handlePaginateChange}
                />

                <ActiveRow
                    data={initRows}
                    id={activeRow}
                    handleActiveRow={this.handleActiveRow}
                />
            </React.Fragment>
        )
    }
}

export default Table;