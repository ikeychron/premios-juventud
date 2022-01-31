import { useEffect } from "react"

// Redux
import { useDispatch } from "react-redux"

// Actions
import {
  setCategories,
  setNominateds,
} from "src/store/modules/generics/actions"

// Firebase
import { getCollectionsFirebase } from "src/lib/db"

const useGetDB = () => {
  const dispatch = useDispatch()

  const getNominateds = async () => {
    try {
      const dataN = await getCollectionsFirebase("nominateds")
      const dataC = await getCollectionsFirebase("categories")

      dispatch(setNominateds(dataN))
      dispatch(setCategories(dataC))
    } catch (e) {
      dispatch(setNominateds([]))
      dispatch(setCategories([]))
    }
  }

  useEffect(() => {
    getNominateds()
  }, [])
  return {}
}

export default useGetDB
