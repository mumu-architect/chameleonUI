import type { ParentProps } from 'solid-js';
import * as DataTable from "@solidiom/data-table"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function dataTableLayout(props: ParentProps) {
    const columns = [
        { id: "name", header: "Name", accessorKey: "name", sortable: true },
        { id: "year", header: "Year", accessorKey: "year", sortable: true },
        { id: "paradigm", header: "Paradigm", accessorKey: "paradigm" },
    ]

    const data = [
        { id: "1", name: "Rust", year: "2010", paradigm: "Systems" },
        { id: "2", name: "TypeScript", year: "2012", paradigm: "Multi-paradigm" },
        { id: "3", name: "Go", year: "2009", paradigm: "Concurrent" },
    ]

    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>DataTable</h1>
            <div>
                <DataTable.Root columns={columns} data={data}>
                <DataTable.Header>
                    <tr>
                        <DataTable.HeaderCell columnId="name">Name</DataTable.HeaderCell>
                        <DataTable.HeaderCell columnId="year">Year</DataTable.HeaderCell>
                        <DataTable.HeaderCell columnId="paradigm">Paradigm</DataTable.HeaderCell>
                    </tr>
                </DataTable.Header>
                <DataTable.Body>
                    {data.map((row) => (
                        <DataTable.Row rowId={row.id}>
                            <DataTable.Cell>{row.name}</DataTable.Cell>
                            <DataTable.Cell>{row.year}</DataTable.Cell>
                            <DataTable.Cell>{row.paradigm}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable.Root>
            </div>
        </main>
    );
}