import React, { Fragment, useContext, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { Context as AuthContext } from '../../services/Context/AuthContext'
import { makeStyles, ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListIcon from '@material-ui/icons/List';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PaymentIcon from '@material-ui/icons/Payment';

function ListMenu(props) {
  const { isAuthenticated } = useContext(AuthContext)
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickJurnal = () => {
    setOpen2(!open2);
  };

  const handleClickOutcome = () => {
    setOpen1(!open1);
  };

  let today = new Date()
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('login')
      props.history.push('/')
    }
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Menu
        </ListSubheader>
      }
      className={classes.root}
    >
      <Divider />
      <Link to='/' className={classes.link}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      {isAuthenticated() && isAuthenticated().data.level === 'Marketing' && (
        <>
          <Link to={`/transaksi-masuk`} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="Transaksi Masuk" />
            </ListItem>
          </Link>

          <Link to={`/list-transaksi-pusat`} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PaymentIcon />
              </ListItemIcon>
              <ListItemText primary="List Transaksi" />
            </ListItem>
          </Link>

        </>
      )}
      {isAuthenticated() && isAuthenticated().data.level !== 'Marketing' && (
        <Fragment>
          <ListItem button onClick={handleClickOutcome}>
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Pengeluaran" />
            {open1 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={!open1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {isAuthenticated() && isAuthenticated().data.level === 'Admin' && (
                <>
                  <Link to={`/transaksi-keluar`} className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <PaymentIcon />
                      </ListItemIcon>
                      <ListItemText primary="Transaksi Keluar" />
                    </ListItem>
                  </Link>
                  <Link to={`/list-pengeluaran-admin`} className={classes.link}>
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <ListIcon />
                      </ListItemIcon>
                      <ListItemText primary="Daftar Pengeluaran" />
                    </ListItem>
                  </Link>
                </>
              )}

              {isAuthenticated() && isAuthenticated().data.level === 'Accountant' && (
                <Link to={`/list-pengeluaran`} className={classes.link}>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Daftar Pengeluaran" />
                  </ListItem>
                </Link>
              )}
            </List>
          </Collapse>
        </Fragment>
      )}

      {isAuthenticated() && isAuthenticated().data.level === 'Accountant' && (
        <Fragment>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText primary="List Transaksi" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={!open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to='/list-transaksi-pusat' className={classes.link}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pusat" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <ListItem button onClick={handleClickJurnal}>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Jurnal" />
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={!open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to={`/jurnal-perhari/${date}`} className={classes.link}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Jurnal Per Hari" />
                </ListItem>
              </Link>
              <Link to={`/jurnal-perbulan`} className={classes.link}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <ListIcon />
                  </ListItemIcon>
                  <ListItemText primary="Jurnal Per Bulan" />
                </ListItem>
              </Link>
            </List>
          </Collapse>

          {<Link to={`/buku-besar`} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Buku Besar" />
            </ListItem>
          </Link>}
          <Link to={`/laporan-keuangan`} className={classes.link} >
            <ListItem button>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Laporan Keuangan" />
            </ListItem>
          </Link>
        </Fragment>
      )}
      <ListItem button onClick={() => handleLogout()}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Keluar" />
      </ListItem>
    </List>
  );
}

export default withRouter(ListMenu)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  }
}));