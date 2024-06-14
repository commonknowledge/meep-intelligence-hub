import { useQuery, gql } from '@apollo/client';
import { ReportContext } from "@/app/reports/[id]/context";
import { useContext } from "react";

import {
  MapReportLayerAnalyticsQuery,
  MapReportLayerAnalyticsQueryVariables,
} from "@/__generated__/graphql";

export const MAP_REPORT_LAYER_ANALYTICS = gql`
  query MapReportLayerAnalytics($reportID: ID!) {
    mapReport(pk: $reportID) {
      id
      layers {
        id
        name
        source {
          id
          organisation {
            name
          }
        }
      }
    }
  }
`



const MembersList = () => {
  const { id } = useContext(ReportContext); // Assuming ReportContext provides `id`
  
  const { loading, error, data } = useQuery(MAP_REPORT_LAYER_ANALYTICS, {
    variables: {
      reportID: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Data</h2>
      {data.mapReport.layers.map((layer, index) => (
        <div key={layer.id || index}>
          <p>Layer ID: {layer.id}</p>
          <p>Layer Name: {layer.name}</p>
          <p>Source ID: {layer.source.id}</p>
          <p>Organisation Name: {layer.source.organisation.name}</p>
        </div>
      ))}
    </div>
  );
};

export default MembersList;