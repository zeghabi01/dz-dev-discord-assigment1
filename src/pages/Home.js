import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuthSystem } from '../utils/AuthSystem'
import { useData } from '../utils/DataProvider';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import BasicModal from '../composants/Modal';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function Home() {

  const {logout} = useAuthSystem()

  const navigate = useNavigate()

  const [page, setPage] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const [id, setId] = React.useState(null);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {loadData,users,dispatch,fetch} = useData()

  const handleOpen = (id) => {
    setId(null)
    setOpen(true)
    setId(id)
  };

  const handleClose = () => setOpen(false);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  useEffect(()=>{
    if(fetch)
    loadData()
  },[fetch])

  const handleChangePage = (event,newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => [
    dispatch({type:'DELETE_USER',payload:id})
  ]

  return (
    <Container>  

      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <Button onClick={() => navigate('/add')} variant="contained">Add User</Button>
        <Button variant="outlined" color='error' onClick={logout}>Logout</Button>
      </div>


      {/* {users.map((item,index) => {return <p key={index}>{item.name} <button onClick={() => handleDelete(item.id)}>Delete</button><button onClick={() => handleEdit(item.id)}>edit</button></p>})} */}

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>Name</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Username</TableCell>
            <TableCell style={{fontWeight:'bold'}}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.username}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                {row.email}
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <Button onClick={() => navigate(`/edit/${row.id}`)}  variant="outlined">Edit</Button>
              </TableCell>
              <TableCell style={{ width: 160 }}>
                <Button onClick= {() => handleOpen(row.id)} color='error' variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Do you Want Delete This User ? 
          </Typography>
          <Button variant="outlined" onClick={handleClose}>Cancal</Button>
          <Button color='error' variant="contained" onClick={() => {
            handleDelete() 
            handleClose()
          } 
            }>Delete</Button>
        </Box>
    </Modal>
    </Container>
  )
}

export default Home