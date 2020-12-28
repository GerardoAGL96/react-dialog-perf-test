import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import { 
  FetchToDos_toDosList_items as ToDo 
} from '../../../shared/graphql-types';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
  title: '',
  description: '',
  finished: false,
}

const useStyle = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    }
  }
}))

export const NoContextFormDialog: React.FC<Props> = ({ open, selected, setDialog }) => {
  const [form, setForm] = useState<Form>(initialState);
  const classes = useStyle();

  useEffect(() => {
    if (open && selected) {
      setForm(prevState => ({
        ...prevState,
        title: selected.title || '',
        description: selected.description || '',
        finished: selected.finished || false,
      }))
    } else if (open && selected === null) {
      setForm(initialState);
    }
  }, [open, selected]);

  const onClose = useCallback(() => {
    setDialog({ open: false, selected: null });
  }, [setDialog]);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;

    setForm(prevState => ({
      ...prevState,
      [name]: name === 'finished' ? checked : value
    }))
  }, []);

  return (
    <Dialog maxWidth="sm" open={open}>
      <DialogTitle>
        {selected ? 'Create To Do' : 'Update To Do'}
      </DialogTitle>
      <DialogContent className={classes.root}>
        <TextField 
          fullWidth
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={form.title}
          onChange={onInputChange}
        />
        <TextField 
          fullWidth
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          value={form.description}
          onChange={onInputChange}
        />
        <Switch 
          name="finished"
          checked={form.finished}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type Props = {
  open: boolean,
  selected: ToDo | null,
  setDialog: Dispatch<SetStateAction<{ open: boolean, selected: ToDo | null }>>
}

type Form = {
  title: string,
  description: string,
  finished: boolean
}