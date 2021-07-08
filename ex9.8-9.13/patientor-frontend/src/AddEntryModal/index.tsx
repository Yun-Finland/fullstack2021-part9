import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { AddHealthCheckForm, AddHospitalForm, AddOccupationalForm } from './AddEntryForm';
import { CheckType, EntryWithoutId } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  type: CheckType
}

export const ChooseEntryModal = ({type, onSubmit, onClose} : Omit<Props, "error"|"modalOpen">) =>{


  {switch(type){    
    case CheckType.Hospital:
      return (<AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />);
    case CheckType.OccupationalCheck:
      return (<AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} />);
    case CheckType.HealthyCheck:
      return (<AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />);
    default:
      return null;
  }}
};

export const EntryModal = ({ modalOpen,onClose, onSubmit, error, type }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new {type} Entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <ChooseEntryModal 
        type={type}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Modal.Content>
  </Modal>
);


