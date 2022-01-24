const createAction = (type) => (payload = null) =>
  payload
    ? {
        type,
        payload,
      }
    : {
        type,
      }

export default createAction
