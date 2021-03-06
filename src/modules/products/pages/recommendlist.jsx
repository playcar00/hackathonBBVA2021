
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import getProducts from '../services/products.service';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));
// "Seguro de Desgravamen", "Credito Hipotecario", "Credito Vehicular", "Credito Motos"
const tiers = [
  {
    id: 'Seguro de Desgravamen',
    title: 'Seguro de Desgravamen',
    price: '',
    description: ['Pídelo desde casa y el dinero estará en tu cuenta al instante'],
    buttonText: 'Pídelo aquí',
    buttonVariant: 'Más Información',
  },
  {
    id: 'Credito Hipotecario',
    title: 'Crédito Hipotecario',
    subheader: '',
    price: '',
    description: [
      'Indemnización de hasta US$100,000 (incluido Covid-19)'
    ],
    buttonText: 'Pídelo aquí',
    buttonVariant: 'Más Información',
  },
  {
    id: 'Credito Motos',
    title: 'Crédito Motos',
    subheader: '',
    price: '',
    description: [
      'Retira, transfiere, envía y recibe dinero gratis'
    ],
    buttonText: 'Pídelo aquí',
    buttonVariant: 'Más Información',
  },
  {
    id: 'Credito Vehicular',
    title: 'Crédito Vehicular',
    subheader: '',
    price: '',
    description: [
      'Retira, transfiere, envía y recibe dinero gratis'
    ],
    buttonText: 'Pídelo aquí',
    buttonVariant: 'Más Información',
  }


];

export default function Pricing(props) {
  const classes = useStyles();
  const { history } = props;
  const [products, setProducts] = useState(tiers)

  useEffect(() => {
    getProductsFunc()
  }, [])

  const getProductsFunc = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      const productsActive = await getProducts(accessToken);
      setProducts(tiers.filter(x => {
        return productsActive.filter(y => x.id === y ? x.id : false)
      }));
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>

      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Ofertas especiales para ti
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Nosotros como BBVA te ofrecemos los siguientes productos en base a tus necesidades.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {products.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === '' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <img src="https://www.bbva.pe//content/dam/public-web/global/images/micro-illustrations/checkbook.svg"></img>


                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={() => history.push("/registro-informacion")} >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

    </React.Fragment>
  );
}
