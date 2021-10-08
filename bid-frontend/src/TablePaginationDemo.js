import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import {FilterContext} from "./App";
import Grid from "@mui/material/Grid";
import SplitButton from "./SplitButton";
import {TextField} from "@mui/material";

export default function TablePaginationDemo(props) {
    const{total} = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const {filter,setFilter} = React.useContext(FilterContext);

    const handleChangePage = (event, page) => {
        setFilter({...filter, page: page+1})
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Grid container spacing={2} sx={{ py: 4 }}>
            <Grid item xs={6} md={4}>
                <SplitButton/>
            </Grid>
            <Grid item xs={6} md={4}>
                <TextField
                    fullWidth
                    onChange={(event)=>{
                        const search = event.target.value;
                        setFilter({...filter, search});
                    }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Grid>
    );
}
