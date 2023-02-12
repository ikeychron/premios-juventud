import { useRouter } from "next/router"
import { useSession } from "@supabase/auth-helpers-react"
import {
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  Card,
  Button,
  ButtonGroup,
  Box,
} from "@chakra-ui/react"
import { DateTime } from "luxon"

import CardLogo from "src/components/Molecules/CardLogo"
import useVotes from "src/hooks/useVotes"
import useNewVote from "src/hooks/useNewVote"

const VotesListPage = () => {
  const { push } = useRouter()
  const { values, actions } = useVotes()
  const { votes, flagNewVote } = values
  const { handleWinners, handleReset } = actions

  const session = useSession()

  return (
    <Box>
      <Box display="flex" w="100%" justifyContent="center">
        <CardLogo />
      </Box>
      <Card borderRadius="sm">
        <Table aria-label="simple table">
          <Thead>
            <Tr>
              <Td>#</Td>
              <Td>Nombres de votantes</Td>
              <Td>Fecha</Td>
            </Tr>
          </Thead>
          <Tbody>
            {votes.length > 0 ? (
              votes.map((row, index) => {
                const date = DateTime.fromISO(row.created_at)

                return (
                  <Tr key={row.name}>
                    <Td fontFamily="Montserrat" fontSize="sm">
                      {index + 1}
                    </Td>
                    <Td fontFamily="Montserrat" fontSize="sm">
                      {row.name}
                    </Td>
                    <Td fontFamily="Montserrat" fontSize="sm">
                      {date.toLocaleString(DateTime.DATE_MED)}
                    </Td>
                  </Tr>
                )
              })
            ) : (
              <Tr>
                <Td fontFamily="Montserrat" fontSize="sm">
                  No hay votantes aún.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Card>

      <ButtonGroup spacing="6px" mt="30px">
        {flagNewVote ? (
          <Button onClick={() => push("/nuevo-voto")} size="md">
            Nuevo voto
          </Button>
        ) : (
          <Button isDisabled size="md">
            Los nuevos votos están desactivados
          </Button>
        )}

        {session?.access_token && (
          <>
            <Button onClick={handleWinners} colorScheme="green" size="md">
              Generar resultado
            </Button>
            <Button onClick={handleReset} colorScheme="yellow" size="md">
              Reiniciar datos
            </Button>
          </>
        )}
      </ButtonGroup>
    </Box>
  )
}

export default VotesListPage
