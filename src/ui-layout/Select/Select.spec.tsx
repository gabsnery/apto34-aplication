import { act, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { theme } from '../theme'
import { Select } from './index'

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
]
describe('Text', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Select variant='outlined'/>)
    expect(baseElement).toBeTruthy()
  })
  it('should display all options', () => {
    render(
      <Select color="primary" variant='outlined' options={options}/>
    )
    const selectElement = screen.getByRole('button')
    act(() => fireEvent.mouseDown(selectElement))
    const _selectElement = screen.getAllByRole('option')
    expect(_selectElement).toHaveLength(4)
  })
  it('should display current value', () => {
    render(
      <Select color="primary" variant='outlined' options={options} value={`1`} />
    )
    const element = screen.getByRole('button')
    expect(element.innerHTML).toContain('Option 1')

  })
  it('should display many selected options when component is multiple', () => {
    const { rerender } = render(
      <Select color="primary" variant='outlined' options={options} type='multiple' value={['1','2']} />
    )
    const element = screen.getByRole('button')
    expect(element.innerHTML).toContain('Option 1, Option 2')
    rerender(<Select variant='outlined' options={options} type='multiple' value={['1','2','4']} />)
    const _element = screen.getByRole('button')
    expect(_element.innerHTML).toContain('Option 1, Option 2, Option 4')
  })
  it('should call the onChange function when a new item is selected', () => {
    const handleChange = jest.fn()
    render(
      <Select color="primary" variant='outlined'
        value={'1'} onChange={handleChange} options={options} />
    )
    const element = screen.getByRole('button')
    act(() => fireEvent.mouseDown(element))
    const _selectElement1 = screen.getByText('Option 3')
    fireEvent.click(_selectElement1);
    act(() => fireEvent.mouseDown(element))
    const _selectElement2 = screen.getByText('Option 4')
    fireEvent.click(_selectElement2);
    expect(handleChange).toHaveBeenCalledTimes(2);
  })
  it('should not call onChange when a group label is selected', () => {
    const handleChange = jest.fn()
    render(
      <Select color="primary" variant='outlined' onChange={handleChange}
        value={'1'}
        options={[
        { group: 'Group 1', value: '1', label: 'Option 1' },
        { group: 'Group 1', value: '2', label: 'Option 2' },
        { group: 'Group 1', value: '3', label: 'Option 3' },
        { group: 'Group 2', value: '4', label: 'Option 4' },
        { group: 'Group 2', value: '5', label: 'Option 5' },
      ]} />
    )
    const element = screen.getByRole('button')
    act(() => fireEvent.mouseDown(element))
    const _selectElement1 = screen.getByText('Group 1')
    fireEvent.click(_selectElement1);
    expect(handleChange).toHaveBeenCalledTimes(0);
  })
  it('should show group title and items differently', () => {
    const handleChange = jest.fn()
    render(
      <Select color="primary" variant='outlined' onChange={handleChange} options={[
        { group: 'Group 1', value: '1', label: 'Option 1' },
        { group: 'Group 1', value: '2', label: 'Option 2' },
        { group: 'Group 1', value: '3', label: 'Option 3' },
        { group: 'Group 2', value: '4', label: 'Option 4' },
        { group: 'Group 2', value: '5', label: 'Option 5' },
      ]} />
    )
    const selectElement = screen.getByRole('button')
    act(() => fireEvent.mouseDown(selectElement))
    const items = screen.getAllByRole('option')
    expect(items).toHaveLength(7)
    const group_items1 = screen.getByText('Group 1')
    const group_items2 = screen.getByText('Group 2')
    const item = screen.getByText('Option 4')
    expect(group_items1.parentElement).toHaveClass('MuiListSubheader-root')
    expect(group_items2.parentElement).toHaveClass('MuiListSubheader-root')
    expect(item).not.toHaveClass('MuiListSubheader-root')
  })

})
