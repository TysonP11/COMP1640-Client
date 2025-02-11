import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Switch from '@material-ui/core/Switch'
import CampaignTableHead from './CampaignTableHead'
import CampaignTableToolbar from './CampaignTableToolbar'
import moment from 'moment'
import { IconButton } from '@material-ui/core'
import EditLocationTwoToneIcon from '@material-ui/icons/EditLocationTwoTone'
import UpdateCampaignForm from './UpdateCampaignForm'
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  editIcon: {
    color: '#33bfff',
  },
}))

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export const CampaignTable = ({
  campaigns,
  getCampaign,
  campaign,
  updateCampaign,
  user,
  updateStatus,
  downloadAllArticl,
}) => {
  const classes = useStyles()
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('start_date')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleShowUpdateForm = () => {
    setShowUpdateForm(true)
  }

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = campaigns.map((n) => n.code)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (code) => selected.indexOf(code) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, campaigns.length - page * rowsPerPage)

  const handleGetCampaign = (code) => {
    getCampaign(code)
    handleShowUpdateForm()
  }

  return (
    <>
      <UpdateCampaignForm
        showUpdateForm={showUpdateForm}
        handleClose={handleCloseUpdateForm}
        campaign={campaign}
        updateCampaign={updateCampaign}
        username={user.username}
      />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <CampaignTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              size={dense ? 'small' : 'medium'}
              aria-label='enhanced table'
            >
              <CampaignTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={campaigns.length}
              />
              <TableBody>
                {stableSort(campaigns, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.code)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.code}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            onClick={(event) => handleClick(event, row.code)}
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell align='left'>{row.code}</TableCell>
                        <TableCell align='left'>
                          {moment
                            .unix(row.submit_deadline)
                            .format('yyyy-MM-DD')}
                        </TableCell>
                        <TableCell align='left'>
                          {moment.unix(row.edit_deadline).format('yyyy-MM-DD')}
                        </TableCell>
                        <TableCell align='left'>
                          {moment.unix(row.start_date).format('yyyy-MM-DD')}
                        </TableCell>
                        <TableCell align='left'>{row.admin_username}</TableCell>
                        <TableCell align='left'>
                          {user.authorities.includes('ROLE_ADMIN') && (
                            <>
                              <IconButton
                                aria-label='update'
                                className={classes.editIcon}
                                onClick={(e) => handleGetCampaign(row.code)}
                              >
                                <EditLocationTwoToneIcon />
                              </IconButton>
                              {row.status === 'ACTIVE' ? (
                                <IconButton
                                  aria-label='update'
                                  onClick={(e) => updateStatus(row.code)}
                                >
                                  <FontAwesomeIcon
                                    icon={faToggleOn}
                                    style={{ color: '#00a152' }}
                                  />
                                </IconButton>
                              ) : (
                                <IconButton
                                  aria-label='update'
                                  onClick={(e) => updateStatus(row.code)}
                                >
                                  <FontAwesomeIcon icon={faToggleOff} />
                                </IconButton>
                              )}
                            </>
                          )}

                          {user.authorities.includes(
                            'ROLE_MARKETING_MANAGER',
                          ) && (
                            <IconButton
                              aria-label='update'
                              onClick={(e) => downloadAllArticl(row.code)}
                            >
                              <SystemUpdateAltIcon
                                style={{ color: '#00a152' }}
                              />
                            </IconButton>
                          )}

                          {user.authorities.includes('ROLE_STUDENT') &&
                            new Date().valueOf() / 1000 < row.submit_deadline &&
                            row.status === 'ACTIVE' && (
                              <IconButton
                                aria-label='update'
                                className={classes.editIcon}
                                href={`/article/create`}
                              >
                                <CreateNewFolderOutlinedIcon />
                              </IconButton>
                            )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={campaigns.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label='Dense padding'
        />
      </div>
    </>
  )
}

CampaignTable.propTypes = {
  campaigns: PropTypes.array.isRequired,
  getCampaign: PropTypes.func.isRequired,
  campaign: PropTypes.object.isRequired,
  updateCampaign: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateStatus: PropTypes.func.isRequired,
  downloadAllArticl: PropTypes.func.isRequired,
}

export default CampaignTable
