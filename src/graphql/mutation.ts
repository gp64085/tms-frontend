import { gql } from "@apollo/client";

export const ADD_SHIPMENT = gql`
  mutation AddShipment(
    $trackingId: String!
    $customerName: String!
    $origin: String!
    $destination: String!
  ) {
    addShipment(
      trackingId: $trackingId
      customerName: $customerName
      origin: $origin
      destination: $destination
    ) {
      id
      trackingId
      status
    }
  }
`;

export const DELETE_SHIPMENT = gql`
  mutation DeleteShipment($id: ID!) {
    deleteShipmentById(id: $id)
  }
`;

export const UPDATE_SHIPMENT_STATUS = gql`
  mutation UpdateShipmentStatus($id: ID!, $status: Status!) {
    updateShipmentStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        role
        username
      }
    }
  }
`;
