// Redux
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useDispatch } from "react-redux"

// Actions
import { setCategories, setNominateds } from "src/store/slices/generics"

const useDB = () => {
  const dispatch = useDispatch()
  const supabase = useSupabaseClient()

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select()

    if (error) {
      console.log("Error ->", error.message)
    }

    dispatch(setCategories(data || []))
  }

  const getNominateds = async () => {
    const { data, error } = await supabase.from("nominateds").select()

    if (error) {
      console.log("Error ->", error.message)
    }

    dispatch(setNominateds(data || []))
  }

  return { getNominateds, getCategories }
}

export default useDB
