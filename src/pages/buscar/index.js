import { useRouter } from "next/router"

// Layout
import GetProducts from "src/components/Organisms/GetProducts"

const Search = () => {
  const {
    query: { q = "" },
  } = useRouter()

  return (
    <GetProducts
      order="created"
      title="Resultados"
      showButton={false}
      query={q}
    />
  )
}

export default Search
