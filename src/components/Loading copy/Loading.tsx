import { Flex, Text, Spinner, Box } from 'theme-ui'

type LoadingProps = {
  text?: string
}

const Loading = ({ text = 'Loading' }: LoadingProps) => (
  <Box>
    <Flex sx={{ alignItems: 'center', py: 2 }}>
      <Text>{text}</Text>
      <Spinner variant="styles.spinner" />
    </Flex>
  </Box>
)

export default Loading
