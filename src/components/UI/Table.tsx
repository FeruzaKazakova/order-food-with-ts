import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Column } from '../../common/utils/types'
import useClientSidePagination from '../../hooks/useClientSidePagination'

type Props<T> = {
    columns: Column<T>[]
    rows: T[]
    getUniqueId: (val: T) => string
    withPagination?: boolean
}

const AppTable = <T,>({
    columns,
    rows,
    getUniqueId,
    withPagination = true,
}: Props<T>) => {
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        paginate,
    } = useClientSidePagination()
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={column.align || 'left'}
                                    style={
                                        column.minWidth
                                            ? {
                                                  minWidth: column.minWidth,
                                              }
                                            : {}
                                    }
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginate(rows).map((row, rowIndex) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={getUniqueId(row)}
                                >
                                    {columns.map((column) => {
                                        if (column.render) {
                                            return (
                                                <TableCell key={column.key}>
                                                    {column.render(row)}
                                                </TableCell>
                                            )
                                        }

                                        const value = column.index
                                            ? rowIndex + 1
                                            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                              //@ts-ignore
                                              row[column.key]

                                        return (
                                            <TableCell
                                                key={column.key}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {withPagination && (
                <TablePagination
                    rowsPerPageOptions={[2, 4]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(e, newPage) => handleChangePage(newPage)}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </Paper>
    )
}

export default AppTable
