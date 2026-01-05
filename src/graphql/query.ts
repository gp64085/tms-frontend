import { gql } from "@apollo/client";

export const GET_SHIPMENTS = gql`
  query GetShipments($page: Int!, $limit: Int!) {
    listShipments(page: $page, limit: $limit) {
      items {
        id
        trackingId
        customerName
        origin
        destination
        status
        flagged
        createdAt
        updatedAt
      }
      totalCount
      hasMore
    }
  }
`;
