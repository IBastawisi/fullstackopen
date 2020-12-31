import React from "react";
import axios from "axios";
import { Button, Container, Table } from "semantic-ui-react";
import { Diagnosis, Entry, NewEntry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import HealthRatingBar from "../components/HealthRatingBar";
import { addPatient, setDiagnosisList, useStateValue } from "../state";
import { useParams } from "react-router-dom";
import EntryDetails from "../EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: { id, newEntry } });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };


  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    !patient && fetchPatient();
    !diagnosis && fetchDiagnosisList();
  }, [dispatch]);

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient </h3>
      </Container>
      {patient && <>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Occupation</Table.HeaderCell>
              <Table.HeaderCell>Health Rating</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

            <Table.Row key={patient.id}>
              <Table.Cell>{patient.name}</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
              <Table.Cell>
                <HealthRatingBar showText={false} rating={1} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        {patient.entries.length > 0 && <Container>
          <h3>Entries </h3>
          {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
        </Container>}
      </>
      }
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientPage;
