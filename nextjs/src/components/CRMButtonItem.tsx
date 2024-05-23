import { GetMemberListQuery } from "@/__generated__/graphql";
import { DataSourceIcon } from "./DataSourceIcon";
import pluralize from "pluralize";
import { format } from "d3-format";

export function CRMSelection({
  source,
  isShared,
}: {
  isShared?: boolean;
  source:
    | GetMemberListQuery["myOrganisations"][0]["sharingPermissionsFromOtherOrgs"][0]["externalDataSource"]
    | GetMemberListQuery["myOrganisations"][0]["externalDataSources"][0];
}) {
  return (
    <div className="flex flex-row items-center gap-2 text-left">
      <DataSourceIcon crmType={source.crmType} className="w-5" />
      <div>
        <div>{source.name}</div>
        {!!source?.importedDataCount && (
          <div className="text-meepGray-400 group-hover:text-meepGray-800 text-xs">
            {format(",")(source?.importedDataCount)}{" "}
            {pluralize("member", source?.importedDataCount)}
          </div>
        )}
        {isShared &&
          source.__typename === "SharedDataSource" &&
          source.organisation?.name && (
            <div className="text-pink-400 group-hover:text-meepGray-800 text-xs">
              Shared by {source?.organisation?.name}
            </div>
          )}
      </div>
    </div>
  );
}
