import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, NumberField, DiagnosisSelection } from "./FormField";
import { NewEntry, EntryType } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new Entry object.
 */

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const typeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "Health check" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" }
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],

      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSubmit={(values: any) => {
        const entry = values;
        switch (entry.type) {
          case EntryType.OccupationalHealthcare:
              entry.sickLeave = {
                startDate: values.leaveStart,
                endDate: values.leaveEnd,
              };
              delete entry.leaveStart;
              delete entry.leaveEnd;
            break;
      
          case EntryType.Hospital:
            entry.discharge = {
              date: values.dischargeDate,
              criteria: values.dischargeCriteria,
            };
            delete entry.dischargeDate;
            delete entry.dischargeCriteria;

            break;
            
            default: break;
          }
          onSubmit(entry);
        }}

      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={typeOptions}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
                      <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          />    
            {
              values.type == EntryType.HealthCheck && <>
                <Field
                  label="healthCheckRating"
                  name="healthCheckRating"
                  component={NumberField}
                  min={0}
                  max={3}
                />
              </>
            }
            {
              values.type == EntryType.Hospital && <>
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />

                <Field
                  label="Discharge Criteria"
                  placeholder="criteria"
                  name="dischargeCriteria"
                  component={TextField}
                />
              </>
            }
            {
              values.type == EntryType.OccupationalHealthcare && <>
                <Field
                  label="Employer Name"
                  placeholder="employer name"
                  name="employerName"
                  component={TextField}
                />
            <Field
              label="Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="leaveStart"
              component={TextField}
            />
            <Field
              label="Leave End Date"
              placeholder="YYYY-MM-DD"
              name="leaveEnd"
              component={TextField}
            />

              </>
            }
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

export default AddEntryForm;
