import { CheckType, EntryWithoutId } from "../types";
import React, {useState} from "react";
import { Form, Button, Container } from 'semantic-ui-react';
import { EntryModal } from "../AddEntryModal/index";

interface EntryProps {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  openModal: () => void;
  error?: string;
}

export const ChooseEntryForm = ({ modalOpen, onClose, onSubmit, openModal, error }: EntryProps) =>{
  const [newType, setNewType] = useState<CheckType|undefined>();

  const handleSubmit = ()=>{
    openModal();   
  };

  return(
    <Container>
      {newType
        ?<EntryModal
          modalOpen={modalOpen}
          onSubmit={onSubmit}
          error={error}
          onClose={onClose}
          type = {newType}
        />
        :null
      }
      <Form onSubmit={handleSubmit}>
        <Form.Field inline required>
          <label>Type</label>
          <select onChange={({target})=>setNewType(target.value as CheckType)}>
            <option value="" selected disabled hidden>-- Choose from here --</option>
            {Object.values(CheckType).map(n => <option key={n} label={n} value={n}>{n}</option>)}
          </select>&nbsp;
          <Button type="submit">Add new Entry</Button>
          </Form.Field>
      </Form>
    </Container>
    );
};

