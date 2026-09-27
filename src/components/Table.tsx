import * as Table from "@solidiom/table";
import { For } from "solid-js";
import {JSX} from "@solidjs/web";

// 表格列定义
export type TableColumn<T> = {
    key: keyof T;
    title: string;
    render?: (row: T) => JSX.Element;
};

type Props<T extends Record<string, any>> = {
    caption?: string;
    columns: TableColumn<T>[];
    data: T[];
};

export function Q_Table<T extends Record<string, any>>(props: Props<T>) {
    return (
        <Table.Root class="w-full text-sm border-collapse">
            {props.caption && (
                <Table.Caption class="mb-3 text-base font-medium text-gray-700 text-left">
                    {props.caption}
                </Table.Caption>
            )}

            <Table.Header>
                <Table.HeaderRow class="border-b border-gray-200 bg-gray-50">
                    <For each={props.columns}>
                        {(col) => (
                            <Table.HeaderCell class="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-600">
                                {col.title}
                            </Table.HeaderCell>
                        )}
                    </For>
                </Table.HeaderRow>
            </Table.Header>

            <Table.Body>
                <For each={props.data}>
                    {(row) => (
                        <Table.Row class="border-b border-gray-200 hover:bg-gray-100 transition-colors">
                            <For each={props.columns}>
                                {(col) => (
                                    <Table.Cell class="border border-gray-200 px-4 py-3">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </Table.Cell>
                                )}
                            </For>
                        </Table.Row>
                    )}
                </For>
            </Table.Body>
        </Table.Root>
    );
}
