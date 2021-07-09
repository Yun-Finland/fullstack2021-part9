import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, FormikProps,Formik, Form } from "formik";

import { TextField, DiagnosisSelection, NumberField } from "./EntryFormField";
import { HealthCheckEntry,HealthCheckRating, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { useStateValue } from "../state";

interface HospitalProps {
  onSubmit: (values: Omit<HospitalEntry,"id">) => void;
  onCancel: () => void;
}

const CommonBaseField =({
  setFieldValue,
  setFieldTouched
}: {
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
})=> {
  const [{ diagnoses },] = useStateValue();

  return (
    <div>
      <Field
      label="Date"
      placeholder="YYYY-MM-DD"
      name="date"
      component={TextField}
    />
    <Field
      label="Specialist"
      placeholder="Specialist"
      name="specialist"
      component={TextField}
    />
    <Field
      label="Description"
      placeholder="Description"
      name="description"
      component={TextField}
    />
    <DiagnosisSelection
      diagnoses={Object.values(diagnoses)}
      setFieldValue = {setFieldValue}
      setFieldTouched = {setFieldTouched}
    />          
  </div>
  );
};

export const AddHospitalForm = ({ onSubmit, onCancel } : HospitalProps ) => {

  return (
    <Formik
      initialValues={{
        type: 'Hospital',
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        discharge: {
          date: "",
          criteria: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.discharge.date || !values.discharge.criteria ) {
          errors.discharge = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonBaseField               
              setFieldValue = {setFieldValue}
              setFieldTouched = {setFieldTouched}
            />
            <Field
              label="Discharge"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />
            <Field
              rows={2}
              placeholder="Criteria"
              name="discharge.criteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface HealthCheckProps {
  onSubmit: (values: Omit<HealthCheckEntry,"id">) => void;
  onCancel: () => void;
}

export const AddHealthCheckForm = ({ onSubmit, onCancel } : HealthCheckProps ) => {

  return (
    <Formik
      initialValues={{
        type: 'HealthCheck',
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.LowRisk
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonBaseField               
              setFieldValue = {setFieldValue}
              setFieldTouched = {setFieldTouched}
            />
            <Field
              label="HealthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

interface OccupationProps {
  onSubmit: (values: Omit<OccupationalHealthCareEntry,"id">) => void;
  onCancel: () => void;
}

export const AddOccupationalForm = ({ onSubmit, onCancel } : OccupationProps ) => {

  return (
    <Formik
      initialValues={{
        type: 'OccupationalHealthcare',
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        employerName:"",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonBaseField               
              setFieldValue = {setFieldValue}
              setFieldTouched = {setFieldTouched}
            />         
            <Field
              label="EmployerName"
              placeholder="EmployerName"
              name="employerName"
              component={TextField}
            />      
            <Field
              label="SickLeave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              rows={2}
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            /> 
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

