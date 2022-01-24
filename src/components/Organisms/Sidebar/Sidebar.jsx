import clsx from "clsx"
import map from "lodash/map"

// Redux
import { connect } from "react-redux"
import { closeSidebar } from "src/store/modules/layout/actions"

// Auth
import { useAuth } from "src/lib/auth"

// Layout
import { Drawer } from "@material-ui/core"
import Link from "src/components/Atoms/Link"

// Icon
import { IoIosLogOut } from "react-icons/io"

// Data
import data from "./data"
import dataAuth from "./dataAuth"

// Styles
import styles from "./styles"

const Sidebar = ({ open }) => {
  const classes = styles()

  // Auth
  const { user, signOut } = useAuth()

  return (
    <div className={classes.root}>
      <Drawer
        className={clsx({
          [classes.drawer]: true,
          [classes.drawerOpen]: open,
        })}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {open && (
          <div className={classes.content}>
            <div className={classes.contentLinks}>
              <div>
                {map(user ? dataAuth : data, ({ Icon, href, link, size }) => (
                  <Link href={href} key={href}>
                    <Icon
                      size={!size ? 24 : size}
                      style={{ marginRight: 12 }}
                    />
                    {link}
                  </Link>
                ))}
                {user && (
                  <Link href="" onClick={signOut}>
                    <IoIosLogOut size={24} style={{ marginRight: 12 }} />
                    Cerrar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

const mapStateToProps = ({ layout: { openSidebar } }) => ({
  open: openSidebar,
})

export default connect(mapStateToProps, { closeSidebar })(Sidebar)
