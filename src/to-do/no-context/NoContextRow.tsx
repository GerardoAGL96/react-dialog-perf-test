import React, { useCallback, useState, MouseEvent } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { FetchToDos_toDosList_items as ToDo } from '../../shared/graphql-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export const ToDoRow: React.FC<Props> = ({ toDo, onDelete, onUpdate }) => {
  const [button, setButton] = useState<HTMLButtonElement | null>(null);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setButton(e.currentTarget)
  }, []);

  const handleUpdate = useCallback(() => {
    onUpdate(toDo);

    setButton(null);
  }, [toDo, onUpdate]);

  const handleDelete = useCallback(() => {
    onDelete(toDo);

    setButton(null)
  }, [toDo, onDelete]);

  return (
    <TableRow>
      <TableCell>
        <Checkbox 
          disableRipple
          checked={toDo.finished || false}
        />
      </TableCell>
      <TableCell>
        {toDo.title}
      </TableCell>
      <TableCell>
        {toDo.description}
      </TableCell>
      <TableCell>
        <IconButton onClick={onClick}>
          <MoreHorizIcon />
        </IconButton>
      </TableCell>
      <Menu
        id="menu"
        anchorEl={button}
        open={Boolean(button)}
        onClose={() => setButton(null)}
      >
        <MenuItem onClick={handleUpdate}>
          Update
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          Delete
        </MenuItem>
      </Menu>
    </TableRow>
  );
}

type Props = {
  toDo: ToDo,
  onDelete: (selected: ToDo) => void,
  onUpdate: (selected: ToDo) => void
}