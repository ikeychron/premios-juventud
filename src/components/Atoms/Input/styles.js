import { makeStyles, fade } from "@material-ui/core"

export default makeStyles(({ palette }) => ({
  default: {
    fontSize: 14,
    color: ({ light }) =>
      `${light ? palette.secondary.main : palette.primary.main} `,

    "&::placeholder": {
      color: ({ light }) =>
        `${fade(light ? palette.secondary.main : palette.primary.main, 0.6)} `,
      opacity: 1,
      lineHeight: 1,
      letterSpacing: "-0.2px",
    },
  },
  helperText: {
    color: "#8696a8",
    fontSize: 13,
    marginTop: 8,
  },
  iconMaterial: {
    width: 18,
    height: 18,
    cursor: "pointer",
    color: ({ light }) =>
      `${light ? palette.secondary.main : palette.primary.main} `,
  },
  inputSecondary: {
    "& > div:before": {
      borderBottom: "none ",
    },
  },
  focused: {
    "&::before": {
      borderBottom: ({ light }) =>
        `2px solid ${light ? palette.secondary.main : palette.primary.main} `,
    },
  },
  label: {
    color: ({ light }) =>
      `${light ? palette.secondary.main : palette.primary.main}`,
  },
  error: {
    color: `${palette.error.main} !important`,
  },
  underline: {
    "&:hover:not(.Mui-disabled):before": {
      borderBottom: ({ light }) =>
        `2px solid ${light ? palette.secondary.main : palette.primary.main} `,
    },

    "&::before": {
      borderBottom: ({ light }) =>
        `2px solid ${light ? palette.secondary.main : palette.primary.main} `,
    },

    "&::after": {
      borderBottom: ({ light }) =>
        `2px solid ${light ? palette.secondary.main : palette.primary.main} `,
    },
  },
}))
