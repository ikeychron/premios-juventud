// Redux
import { useToast } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useDispatch } from "react-redux"

// Actions
import {
  setCategories,
  setNominateds,
  setVotes,
} from "src/store/slices/generics"

const useDB = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const supabase = useSupabaseClient()

  const getCategories = async () => {
    const { data, error } = await supabase.from("categories").select()

    if (error) {
      console.log("Error Get Categories ->", error)
      return
    }

    dispatch(setCategories(data || []))
  }

  const getNominateds = async () => {
    const { data, error } = await supabase.from("nominateds").select()

    if (error) {
      console.log("Error Get Nominateds ->", error)
      return
    }

    dispatch(setNominateds(data || []))
  }

  const getVotes = async () => {
    const { data, error } = await supabase.from("votes").select()

    if (error) {
      console.log("Error Get Votes ->", error)
      return
    }

    dispatch(setVotes(data || []))
  }

  const createVote = async (vote) => {
    const { error } = await supabase.from("votes").insert([vote])

    if (error) {
      console.log("Error Crate Votes ->", error)
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return
    }
    getVotes()
  }

  return { getNominateds, getCategories, getVotes, createVote }
}

export default useDB
