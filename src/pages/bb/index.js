import { useRouter } from "next/router"

// Layout
import GetNominateds from "src/components/Organisms/Nominateds"

const Search = () => {
  const {
    query: { q = "" },
  } = useRouter()

  return (
    <GetNominateds
      order="created"
      title="Resultados"
      showButton={false}
      query={q}
    />
  )
}

export default Search
