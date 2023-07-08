import { render } from '@testing-library/react'
import { Text } from './index'
describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Text variant="h3" />)
    expect(baseElement).toBeTruthy()
  })

  it('should have the adequate color on text', () => {
    const content = '-!TextTestPhrase_'
    const { baseElement } = render(<>
      <Text variant="h4" color="primary">{content}</Text>
      <Text variant="h3" color="secondary">{content}</Text>
    </>)
    expect(baseElement.innerHTML).toContain(content)
  })
})
