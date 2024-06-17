import React from 'react';
import { useReportContext } from "@/app/reports/[id]/context";
import { AnalyticalAreaType } from "@/__generated__/graphql";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ConsSettings() {
    const { displayOptions, setDisplayOptions } = useReportContext();

    const toggleElectionData = () => {
        setDisplayOptions({ showLastElectionData: !displayOptions.showLastElectionData });
    };

    const toggleMps = () => {
        setDisplayOptions({ showMPs: !displayOptions.showMPs });
    };

    const handleAnalyticalAreaTypeChange = (value) => {
        setDisplayOptions({ analyticalAreaType: value });
    };

    return (
        <div className="p-3 pb-4 flex flex-col gap-2">
            <span className=" text-dataName uppercase mb-2 text-meepGray-300">Westminster politics</span>
            <ToggleGroup
                type="single"
                value={displayOptions.analyticalAreaType}
                onValueChange={handleAnalyticalAreaTypeChange}
                defaultValue={AnalyticalAreaType.ParliamentaryConstituency_2025}
            >
                <ToggleGroupItem variant="outline" value={AnalyticalAreaType.ParliamentaryConstituency_2025}>
                    2024 constituencies
                </ToggleGroupItem>
                <ToggleGroupItem variant="outline" value={AnalyticalAreaType.ParliamentaryConstituency}>
                    Old constituencies
                </ToggleGroupItem>
            </ToggleGroup>

            <div className="text-labelLg text-meepGray-200 flex items-center gap-2">
                <Checkbox
                    checked={displayOptions.showMPs}
                    onCheckedChange={toggleMps}
                />
                Current MP
            </div>
            <div className="text-labelLg text-meepGray-200 flex items-center gap-2">
                <Checkbox
                    checked={displayOptions.showLastElectionData}
                    onCheckedChange={toggleElectionData}
                />
                Last GE election results
            </div>
        </div>
    );
}
