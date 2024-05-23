import { gql } from "@apollo/client";

export const UDPATE_EXTERNAL_DATA_SOURCE = gql`
  mutation UpdateExternalDataSource($input: ExternalDataSourceInput!) {
    updateExternalDataSource(data: $input) {
      id
      name
      geographyColumn
      geographyColumnType
      postcodeField
      firstNameField
      lastNameField
      emailField
      phoneField
      addressField
      autoUpdateEnabled
      updateMapping {
        source
        sourcePath
        destinationColumn
      }
    }
  }
`;
