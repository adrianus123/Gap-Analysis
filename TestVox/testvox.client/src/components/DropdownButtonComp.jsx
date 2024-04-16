import { Button } from '@material-tailwind/react'
import React from 'react'

const DropdownButtonComp = ({icon, name, action}) => {
  return (
    <Button
        onClick={action}
        ripple={false}
        size="sm"
        variant="text"
        fullWidth
        className="flex items-center gap-3 capitalize"
      >
        {icon}
        <span>{name}</span>
      </Button>
  )
}

export default DropdownButtonComp