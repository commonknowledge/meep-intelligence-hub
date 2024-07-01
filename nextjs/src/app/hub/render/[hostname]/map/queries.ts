import { gql } from "@apollo/client"

export const GET_HUB_MAP_DATA = gql`
  query GetHubMapData($hostname: String!) {
    hubByHostname(hostname: $hostname) {
      id
      organisation {
        id
        slug
        name
      }
      layerGroups {
        id
        name
        iconUrl
        visible
        mapboxPaint
        mapboxLayout
        mapboxLayerType
        layers {
          id
          name
          visible
          sourceId
          mapboxPaint
          mapboxLayout
          mapboxLayerType
        }
      }
      navLinks {
        label
        link
      }
    }
  }
`


export const EVENT_FRAGMENT = gql`
  fragment EventFragment on GenericData {
    id
    title
    address
    postcode
    startTime
    publicUrl
    description
    dataType {
      id
      dataSet {
        externalDataSource {
          dataType
        }
      }
    }
  }
`

export const CONSTITUENCY_VIEW_FRAGMENT = gql`
  fragment ConstituencyViewFragment on Area {
    id
    gss
    name
    # For zooming
    fitBounds
    # For loudspeek
    samplePostcode {
      postcode
    }
    # PPCs
    ppcs: people(filters:{personType:"PPC"}) {
      id
      name
      photo {
        url
      }
      party: personDatum(filters:{
        dataType_Name: "party"
      }) {
        name: data
        shade
      }
      email: personDatum(filters:{
        dataType_Name: "email"
      }) {
        data
      }
    }
  }
`

export const CONSTITUENCY_DATA_FRAGMENT = gql`
  fragment ConstituencyDataFragement on MapLayerGroup {
    id
    name
    iconUrl
    layers {
      id
      name
      source {
        id
        name
        dataType
        organisation {
          name
        }
      }
      data {
        ...EventFragment
      }
    }
  }
  ${EVENT_FRAGMENT}
`

export const GET_LOCAL_DATA = gql`
  query GetLocalData($postcode: String!, $hostname: String!) {
    postcodeSearch(postcode: $postcode) {
      postcode
      constituency: constituency2024 {
        ...ConstituencyViewFragment
        # List of events
        genericDataForHub(hostname: $hostname) {
          ...ConstituencyDataFragement
        }
      }
    }
  }
  ${CONSTITUENCY_VIEW_FRAGMENT}
  ${CONSTITUENCY_DATA_FRAGMENT}
`

export const GET_EVENT_DATA = gql`
  query GetEventData($eventId: String!, $hostname: String!) {
    importedDataGeojsonPoint(genericDataId: $eventId) {
      properties {
        constituency: area(areaType: "WMC23") {
          ... ConstituencyViewFragment
          # List of events
          genericDataForHub(hostname: $hostname) {
            ...ConstituencyDataFragement
          }
        }
      }
    }
  }
  ${CONSTITUENCY_VIEW_FRAGMENT}
  ${CONSTITUENCY_DATA_FRAGMENT}
`