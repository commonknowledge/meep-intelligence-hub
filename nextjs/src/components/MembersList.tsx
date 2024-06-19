import { useQuery, gql } from '@apollo/client';
import { ReportContext } from "@/app/reports/[id]/context";
import { useContext, useState, useEffect } from "react";
import { selectedMemberAtom } from '@/app/reports/[id]/page';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from './ui/input';
import { Search } from 'lucide-react';
import { useAtom } from 'jotai';

// GraphQL queries
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
`;

export const MEMBER_DATA = gql`
  query genericDataByExternalDataSource($externalDataSourceId: String!) {
    genericDataByExternalDataSource(externalDataSourceId: $externalDataSourceId) {
      id
      fullName
      email
      postcodeData {
        latitude
        longitude
        postcode
        parliamentaryConstituency
        parliamentaryConstituency2025
      }
    }
  }
`;

const MembersList = ({ constituenciesFilter = null }) => {
  const { id } = useContext(ReportContext); // Assuming ReportContext provides `id`
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query
  const [selectedMember, setSelectedMember] = useAtom(selectedMemberAtom)


  // First query to get source.id
  const { loading: loadingLayers, error: errorLayers, data: dataLayers } = useQuery(MAP_REPORT_LAYER_ANALYTICS, {
    variables: {
      reportID: id,
    },
    onCompleted: (data) => {
      if (data?.mapReport?.layers?.length > 0) {
        // Set the sourceId from the first layer as an example
        setSourceId(String(data.mapReport.layers[0].source.id));
      }
    },
  });

  // Second query to get member data using sourceId
  const { loading: loadingMembers, error: errorMembers, data: dataMembers } = useQuery(MEMBER_DATA, {
    variables: {
      externalDataSourceId: sourceId ?? "", // Provide a default empty string if sourceId is null
    },
    skip: !sourceId, // Skip the query until sourceId is available
  });


  if (loadingLayers || (sourceId && loadingMembers)) return <p>Loading...</p>;
  if (errorLayers) return <p>Error: {errorLayers.message}</p>;
  if (errorMembers) return <p>Error: {errorMembers.message}</p>;

  // Filter members based on search query and constituenciesFilter
  const filteredMembers = dataMembers?.genericDataByExternalDataSource?.filter((member: any) => {
    const matchesSearchQuery = member.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConstituency = !constituenciesFilter || 
      member.postcodeData.parliamentaryConstituency === constituenciesFilter || 
      member.postcodeData.parliamentaryConstituency2025 === constituenciesFilter;
    return matchesSearchQuery && matchesConstituency;
  });
  return (
    <div className='h-full'>
      <div className='flex gap-2 mb-2 items-center justify-between'>
        <h2 className='text-sm text-meepGray-300 '>Members in this map</h2>
        <Input 
          placeholder='Search Members' 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-1/3 bg-meepGray-600 text-meepGray-200'
        />
      </div>

      <Table>
        <TableHeader >
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Postcode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers?.map((member: any) => (
            <TableRow 
              key={member.id} 
              className={`cursor-pointer hover:bg-meepGray-600 ${selectedMember?.id === member.id ? 'bg-meepGray-700' : ''}`}
              onClick={() => {
                console.log('Selected member:', member.postcodeData);
                setSelectedMember(member);
                
              }}
            >
              <TableCell>{member.fullName}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.postcodeData?.postcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersList;
