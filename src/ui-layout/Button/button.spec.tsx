import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from './index'
import { theme } from '../theme'

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Button color="primary" variant="contained" />
    )
    expect(baseElement).toBeTruthy()
  })

  it('should display the children as text', () => {
    const content = '-!ButtonTestPhrase_'
    render(
      <Button color="primary" variant="contained">
        {content}
      </Button>
    )
    const element = screen.getByText(content)
    expect(element.innerHTML).toContain(content)
  })

  it('should call the click function', () => {
    const content = '-!ButtonContent_'
    const handleClick = jest.fn()
    render(
      <Button color="primary" variant="contained" onClick={handleClick}>
        {content}
      </Button>
    )
    act(() =>  fireEvent.click(screen.getByText(content)))
    act(() =>  fireEvent.click(screen.getByText(content)))
    act(() =>  fireEvent.click(screen.getByText(content)))
    expect(handleClick).toHaveBeenCalledTimes(3)
  })

  it('should not call the click function if disabled', () => {
    const content = '-!ButtonContent_'
    const handleClick = jest.fn()
    render(
      <Button
        color="primary"
        variant="contained"
        onClick={handleClick}
        disabled
      >
        {content}
      </Button>
    )
    act(() =>  fireEvent.click(screen.getByText(content)))
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  it('should have the adequate color', () => {
    render(
      <>
        <Button color="primary" variant="contained">
          Primary
        </Button>
        <Button color="secondary" variant="contained">
          Secondary
        </Button>
      </>
    )
    const primary = screen.getByText('Primary')
    const secondary = screen.getByText('Secondary')

    expect(primary).toHaveStyle(
      `background-color: ${theme.palette.primary.main}`
    )
    expect(secondary).toHaveStyle(
      `background-color: ${theme.palette.secondary.main}`
    )
  })
})
