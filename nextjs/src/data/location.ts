import { PointFieldTypes } from "@/__generated__/graphql";

export const locationTypeOptions = [
    {
        value: PointFieldTypes.Postcode,
        label: "Postcode",
    },
    {
        value: PointFieldTypes.Address,
        label: "Address",
    },
    {
        value: PointFieldTypes.Ward,
        label: "Ward",
    },
    {
        value: PointFieldTypes.AdminDistrict,
        label: "Council",
    },
    {
        value: PointFieldTypes.ParliamentaryConstituency,
        label: "Constituency",
    },
    {
        value: PointFieldTypes.ParliamentaryConstituency_2025,
        label: "Constituency (2024)",
    }
]