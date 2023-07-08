import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TextField } from './index'

describe('TextField', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextField />)
    expect(baseElement).toBeTruthy()
  })

  it('should display the content as text', () => {
    const content = '-!TextFieldTestPhrase_'
    render(<TextField value={content} />)
    const element = screen.getByDisplayValue(content)
    expect(element.getAttribute('value')).toContain(content)
  })

  it('should call the onChange function when edited', () => {
    const content = '-!TextFieldContent_'
    const handleChange = jest.fn()
    render(<TextField onChange={handleChange} value={content} />)
    const element = screen.getByDisplayValue(content)
    fireEvent.change(element, {
      target: { value: 'test' },
    })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should not call the focus function if disabled', () => {
    const content = '-!TextFieldContent_'
    const handleFocus = jest.fn()
    render(<TextField onFocus={handleFocus} value={content} disabled />)
    const element = screen.getByDisplayValue(content)
    fireEvent.focus(element)
    expect(handleFocus).toHaveBeenCalledTimes(0)
  })
})
