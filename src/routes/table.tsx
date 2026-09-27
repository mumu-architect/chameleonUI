import type { ParentProps } from 'solid-js';
import * as Table from "@solidiom/table"
import {Q_Table, TableColumn} from "../components/Table";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.

export default function tableLayout(props: ParentProps) {
    type UserItem = {
        name: string;
        age: number;
        email: string;
        address:string;
    };
    const columns = [
            { key: "name", title: "Name" },
            { key: "age", title: "Age" },
            { key: "email", title: "Email" },
            { key: "address", title: "Address" },
    ] satisfies TableColumn<UserItem>[];

    const tableData: UserItem[] = [
            { name: "Ada", age: 18, email: "ada@example.com",address: "wewe"},
            { name: "Ada", age: 15, email: "ada@example.com" ,address: "wewe"},
    ];
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>Table</h1>
            <div>
            <Table.Root class="w-full text-sm border-collapse">
                <Table.Caption class="mb-3 text-base font-medium text-gray-700 text-left">Users</Table.Caption>
                <Table.Header>
                    <Table.HeaderRow class="border-b  border-gray-200 bg-gray-50">
                        <Table.HeaderCell class="border  border-gray-200 px-4 py-3 text-left font-semibold text-gray-600">Name</Table.HeaderCell>
                        <Table.HeaderCell class="border border-gray-200  px-4 py-3 text-left font-semibold text-gray-600">Age</Table.HeaderCell>
                        <Table.HeaderCell class="border border-gray-200  px-4 py-3 text-left font-semibold text-gray-600">Email</Table.HeaderCell>
                    </Table.HeaderRow>
                </Table.Header>
                <Table.Body class="border-b border-gray-100  data‑[selected]:bg-blue‑50 transition-colors">
                    <Table.Row  class="border-b border-gray-200 hover:bg-gray-100 ">
                        <Table.Cell class="border  border-gray-200  px-4 py-3">Ada</Table.Cell>
                        <Table.Cell class="border  border-gray-200  px-4 py-3">18</Table.Cell>
                        <Table.Cell class="border  border-gray-200  px-4 py-3">ada@example.com</Table.Cell>
                    </Table.Row>
                    <Table.Row  class="border-b border-gray-200 hover:bg-gray-100">
                        <Table.Cell class="border  border-gray-200  px-4 py-3">Ada</Table.Cell>
                        <Table.Cell class="border  border-gray-200  px-4 py-3">15</Table.Cell>
                        <Table.Cell class="border  border-gray-200 px-4 py-3">ada@example.com</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> Q_Table components</h1>
            <div>

                <Q_Table caption="Users" columns={columns} data={tableData} />
            </div>
        </main>
    );
}