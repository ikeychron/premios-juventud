// Redux
import { useToast } from "@chakra-ui/react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useDispatch } from "react-redux"

// Actions
import {
  setCategories,
  setNominateds,
  setVotes,
  deleteVotes as deleteVotesAction,
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
    const { data, error } = await supabase
      .from("nominateds")
      .select()
      .order("name", "asc")

    if (error) {
      console.log("Error Get Nominateds ->", error)
      return
    }

    dispatch(setNominateds(data || []))
  }

  const updateNominateds = async (data) => {
    const { data: res, error } = await supabase
      .from("nominateds")
      .upsert(data)
      .select()

    await getNominateds()

    console.log({ res })

    if (error) {
      console.log("Error Update Nominated ->", error)
    }
  }

  const resetNominateds = async (data) => {
    const { data: res, error } = await supabase
      .from("nominateds")
      .upsert(data)
      .select()

    await getNominateds()

    console.log({ res })

    if (error) {
      console.log("Error Reset Nominateds ->", error)
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
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
      console.log("Error Create Votes ->", error)
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

  const deleteVotes = async () => {
    const { data, error } = await supabase.from("votes").delete().gte("id", 0)
    console.log({ data, error })

    if (error) {
      console.log("Error Delete Votes ->", error)
      toast({
        title: "Error",
        description: error?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      return
    }

    dispatch(deleteVotesAction())
  }

  return {
    getNominateds,
    updateNominateds,
    resetNominateds,
    getCategories,
    getVotes,
    createVote,
    deleteVotes,
  }
}

export default useDB
