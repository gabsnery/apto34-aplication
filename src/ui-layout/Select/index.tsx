import React, { useState,FC } from 'react';
import { StyledComponent } from '@emotion/styled';
import {
  Checkbox, FormControl, ListSubheader, InputLabel, MenuItem, Radio,
  Select as MUISelect, BottomNavigation, SelectProps as MUISelectPropsProps, Box, TableFooter
} from '@mui/material';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { Text } from '../Text';
import {
  BaseSelect
} from './styles';
import { Button } from '../Button';

interface OptionProps {
  icon?: JSX.Element,
  group?: string,
  value: string,
  label: string,
}
interface _SelectProps extends MUISelectPropsProps {
  mainIcon?: JSX.Element,
  options?: OptionProps[],
  type?: 'multiple' | 'radio',
  variation?: 'filled' | 'composed',
  footer?: 'basic' | 'complete',
}


export const Select: FC<_SelectProps> = ({ children, type, mainIcon, footer, options, ...SelectProps }) => {

  const renderItems = (_options: OptionProps[] | undefined) => {
    let { grouped, options } = sortedOptions(_options);
    if (grouped) {
      let elements: any[] = []
      for (const [key, value] of Object.entries(options)) {
        elements.push(<ListSubheader key={key}>
          {renderItem({ value: key, label: key }, SelectProps['value'] ?? [], type, true)}
        </ListSubheader>)
        elements.push((value as OptionProps[]).map((i: any, index) => <MenuItem key={index} >
          {renderItem(i, SelectProps['value'] ?? [], type, false)}
        </MenuItem>))
      }
      elements.push(renderFooter(footer))
      return elements;
    }
    return ([options.map((y: any, idx: any) => {
      return (
        <MenuItem value={y.value} key={idx} >
          {renderItem(y, SelectProps['value'], type, false)}
        </MenuItem>)
    }), renderFooter(footer)])
  }

  const renderFooter = (footer: any) => {
    switch (footer) {
      case 'basic':
        return <Box key={"items_footer"} sx={{
          display: 'flex'
        }} >
          <Button sx={{ margin: '10px 10px 10px auto', color: 'white' }} variant='outlined' color='primary'>Ok</Button>
        </Box>
        break;
      case 'complete':
        return <Box key={"items_footer"} sx={{
          display: 'flex',
        }} >
          <Button sx={{ margin: '10px auto 10px 10px', color: 'white', textDecoration: 'underline' }} disabled={false} color='primary' variant='text' >Limpar</Button>
          <Button sx={{ margin: '10px 10px 10px auto', color: 'white' }} variant='outlined' color='primary'>Ok</Button>
        </Box>
        break;
      default:
        return
        break;

    }
  }

  return <FormControl fullWidth sx={{width: '100%'}}
    variant="outlined" 
  >
    <InputLabel sx={{
      //marginLeft: '20px',
      '&.MuiFormLabel-filled': {
        fontSize: "14px",
        fontWeight:700,
        letterSpacing:'2px',
        '& .MuiSvgIcon-root': {
          display: 'none'
        }
      },
    }}>
      <Box display="flex">
        {mainIcon ?? ''}
        {SelectProps.label}
      </Box>
    </InputLabel>
    <BaseSelect 
      IconComponent={KeyboardArrowDown}
      fullWidth
      renderValue={(value:any) => renderValue(value, options ?? [], type)}
      MenuProps={{
        sx: {
          '& .MuiList-root': {
            paddingBottom: footer ? '0' : '15px',
            color: 'rgb(242, 242, 242)',
          
          }
        }
      }}
      {...SelectProps}>{
        renderItems(options)}
    </BaseSelect >
  </FormControl >
}

const renderValue = (value: unknown, options: OptionProps[], type?: 'multiple' | 'radio',) => {
  switch (type) {
    case 'multiple':
      return <><Text sx={{ verticalAlign: 'middle' }} variant='body' >{(value as []).map(i => options.find(j => j.value === i)?.label).join(', ')}</Text>
      </>
      break;
    case 'radio':
      return <><Text sx={{ verticalAlign: 'middle' }} variant='body' >{(options.find(j => j.value === value)?.label)}</Text></>
      break;
    default:
      return <><Text sx={{ verticalAlign: 'middle' }} variant='body' >{(options.find(j => j.value === value)?.label)}</Text></>
      break;
  }
}
const renderItem = (item: OptionProps, selectedValue: unknown | unknown[], type?: 'multiple' | 'radio', parent?: boolean) => {
  if (parent)
    return <><Text variant={'body'}  color={'secondary'} sx={{ color: '#DADBAD', marginTop: '16px' }}>{item.label ?? item.group}</Text></>
  switch (type) {
    case 'multiple':
      return <>{item.icon ?? ''}<Text variant='body' style={{
        width: 'calc(100% - 32px)'
      }} >{item.label ?? item.group}</Text>
        <Checkbox sx={
          {
            width: '32px',
            '&.Mui-checked': {
              color: 'white'
            }
          }
        } checked={(selectedValue as unknown[]).indexOf(item.value) > -1} /></>
    case 'radio':
      return <>{item.icon ?? ''}<Text variant='body' style={{
        width: 'calc(100% - 32px)'
      }} >{item.label ?? item.group}</Text>
        <Radio sx={
          {
            width: '32px',
            '&.Mui-checked': {
              color: 'white'
            }
          }
        } checked={item.value === selectedValue} /></>
    default:
      return <>{item.icon ?? ''}<Text variant='body' >{item.label ?? item.group}</Text></>
  }
}
const sortedOptions = (_options: any[] | undefined) => {
  if (!_options)
    return { grouped: false, options: [] }

  let containGroup = false;
  for (var i = 0; i < _options.length; i++) {
    if (_options[i].hasOwnProperty('group')) {
      containGroup = true
      break;
    }
  }
  if (!containGroup)
    return { grouped: false, options: _options }
  else {
    let result = _options.reduce(function (r: any, a: any) {
      r[a.group ?? ''] = r[a.group ?? ''] || [];
      r[a.group ?? ''].push(a);
      return r;
    }, Object.create(null));
    return { grouped: true, options: result }
  }
}