import { useEffect, useState } from "react"
import Router from "next/router"
import { filter, map, includes } from "lodash"

// Layout
import { Container } from "@material-ui/core"
import { Text, Button } from "src/components/Atoms"
import ProductList from "src/components/Molecules/ProductList"

// Firebase
import { getProductsFirebase } from "src/lib/db"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    backgroundColor: palette.primary.main,

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  // Content Header
  contentHeader: {
    "& > h1": {
      color: palette.secondary.main,
      fontSize: 24,
      margin: "15px 0",
      fontWeight: "bold",
    },

    "& button": {
      marginBottom: 40,
    },
  },
  // Content
  content: {
    width: "100%",
    display: "grid",
    gridGap: "10px",
    gap: "10px",

    "& > p": {
      color: palette.secondary.main,
    },
  },
}))

const GetProducts = ({
  order = "created",
  title = "Nominados",
  showButton = true,
  query = "",
}) => {
  const classes = styles()
  const [products, setProducts] = useState([])

  const handleProductos = (snapshot) => {
    const productsDB = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    if (query) {
      const filterProducts = filter(productsDB, (p) =>
        includes(p.name.toLowerCase(), query.toLowerCase())
      )
      setProducts(filterProducts)
    } else {
      setProducts(productsDB)
    }
  }

  const getProductos = async () => {
    await getProductsFirebase(handleProductos, order)
  }

  useEffect(() => {
    getProductos()
  }, [query])

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.contentHeader}>
          <Text component="h1">{title}</Text>
        </div>
        <div className={classes.content}>
          {products.length > 0 ? (
            <>
              {map(products, (product) => (
                <ProductList product={product} key={product.id} />
              ))}
            </>
          ) : (
            <Text>No hay nominados aún.</Text>
          )}
        </div>
      </Container>
    </div>
  )
}

export default GetProducts
