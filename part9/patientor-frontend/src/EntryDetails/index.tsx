import React from "react";
import { Icon, Item } from "semantic-ui-react";
import HealthRatingBar from "../components/HealthRatingBar";
import { useStateValue } from "../state";
import { Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  switch (entry.type) {
    case "HealthCheck":
      return <Item.Group>
        <Item>
        <Icon name="user md" size='huge' />
          <Item.Content>
            <Item.Header>Health Check</Item.Header>
            <Item.Meta>
              <span>{entry.date}</span>
              <span>At <b>{entry.specialist}</b></span>
              {entry.diagnosisCodes?.map(c => <p key={c}>{c}: {diagnosis[c]?.name}</p>)}

            </Item.Meta>
            <Item.Description>{entry.description}</Item.Description>
            <HealthRatingBar showText={false} rating={entry.healthCheckRating} />
          </Item.Content>
        </Item>
      </Item.Group>;

    case "Hospital":
      return <Item.Group>
        <Item>
          <Icon name="hospital" size='huge' />
          <Item.Content>
            <Item.Header>Hospital</Item.Header> 
            <Item.Meta>
              <span>{entry.date}</span>
              <span>At <b>{entry.specialist}</b></span>
              {entry.diagnosisCodes?.map(c => <p key={c}>{c}: {diagnosis[c]?.name}</p>)}

            </Item.Meta>
            <Item.Description>{entry.description}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>;

    case "OccupationalHealthcare":
      return <Item.Group>
        <Item>
        <Icon name="first aid" size='huge' />
          <Item.Content>
            <Item.Header>Occupational Healthcare</Item.Header>
            <Item.Meta>
              <span>{entry.date}</span>
              <span>At <b>{entry.specialist}</b></span>
              <br />
              <span>ُEmployer <b>{entry.employerName}</b></span>
              {entry.diagnosisCodes?.map(c => <p key={c}>{c}: {diagnosis[c]?.name}</p>)}

            </Item.Meta>
            <Item.Description>{entry.description}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>;

    default:
      return null;
  }
};

export default EntryDetails;
