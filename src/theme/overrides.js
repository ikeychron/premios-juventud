export default {
  MuiButton: {
    root: {
      borderRadius: 4,

      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    /* contained: {
      boxShadow: 'none',

      '&:hover': {
        boxShadow: 'none'
      },
      '&:active': {
        boxShadow: 'none '
      }
    }, */
    label: {
      textTransform: "initial",
    },
  },
  MuiTab: {
    root: {
      minWidth: "max-content !important",
    },
  },
  MuiDialog: {
    paperWidthXs: {
      maxWidth: 350,
    },
  },
  MuiDialogActions: {
    root: {
      justifyContent: "center",
      flexDirection: "column",
    },
  },
}
