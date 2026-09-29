import {createMemo, createSignal, For, ParentProps} from 'solid-js';
import * as DataTable from "@solidiom/data-table"
import {ColumnDef} from "@solidiom/data-table";
import {Q_Button} from "../components/Button";
import * as Table from "@solidiom/table";
import * as Pagination from "@solidiom/pagination";
import {query} from "@solidjs/router";
import {getRequestEvent} from "@solidjs/web";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function dataTableLayout(props: ParentProps) {
    //Solidiom DataTable SortState 类型
// Solidiom 的 SortState 类型，不是 TanStack SortingState
    type LangItem = {
        id: string;
        name: string;
        year: string;
        paradigm: string;
    };

    type MultiSortItem = {
        columnId: string;
        direction: "asc" | "desc";
    };
    const [columnsTable,setColumnsTable]=createSignal<ColumnDef<LangItem>[]>([
        { id: "id", header: "Id", accessorKey: "id", sortable: true },
        { id: "name", header: "Name", accessorKey: "name", sortable: true },
        { id: "year", header: "Year", accessorKey: "year", sortable: true },
        { id: "paradigm", header: "Paradigm", accessorKey: "paradigm",sortable: false  },

    ])

    const getDataTables = query(async (id: string) => {
        // Same-origin URLs need an explicit origin when this runs during SSR
        // (getRequestEvent() is undefined in the browser, where location wins).
        let origin = getRequestEvent()?.request.url ?? location.origin;
        let response = await fetch(new URL('/dataTables.json', origin));
        let users: Record<string, {id:string; name: string; year: string ; paradigm: string }> =
            await response.json();
        return users;
    }, 'dataTables');


    // 加载函数
    const loadData = async (page: number) => {
        const result = await getDataTables("1");
        setDataTable(result);
    };

    // 初始执行
    loadData(1);
    const [dataTable,setDataTable]=createSignal(
        [
         { id: "1", name: "Rust", year: "2010", paradigm: "Systems" },
         { id: "2", name: "TypeScript", year: "2012", paradigm: "Multi-paradigm" },
         { id: "3", name: "Go", year: "2009", paradigm: "Concurrent" },
    ]
)


// 创建信号，初始按 id 升序
    const [sortList, setSortList] = createSignal<MultiSortItem[]>([
        { columnId: "id", direction: "asc" },
    ]);
    const sortedData = createMemo(() => {
        const sorts = sortList();
        return [...dataTable()].sort((a, b) => {
            for (const s of sorts) {
                const valA = a[s.columnId as keyof LangItem];
                const valB = b[s.columnId as keyof LangItem];
                let cmp = 0;
                // 数字字段
                if (s.columnId === "id" || s.columnId === "year") {
                    const numA = Number(valA);
                    const numB = Number(valB);
                    cmp = numA - numB;
                } else {
                    // 文本字段
                    cmp = String(valA).localeCompare(String(valB));
                }
                if (cmp !== 0) {
                    return s.direction === "asc" ? cmp : -cmp;
                }
                // 当前列相等，进入下一个排序字段
            }
            return 0;
        });
    });
    // 获取某一列的排序信息，用于渲染箭头 + 序号
    const getColumnSortInfo = (colId: string) => {
        const sorts = sortList();
        const idx = sorts.findIndex(x => x.columnId === colId);
        if (idx === -1) return null;
        return {
            direction: sorts[idx].direction,
            order: idx + 1, // 排序优先级 1,2,3
        };
    };



    // 👉 表头点击事件：切换排序状态
    const handleHeaderClick = (colId: string, e: MouseEvent) => {
        const isShift = e.shiftKey;
        setSortList(prev => {
            const existIdx = prev.findIndex(s => s.columnId === colId);
            if (existIdx >= 0) {
                // 该列已存在：翻转方向
                const newList = [...prev];
                const item = newList[existIdx];
                newList[existIdx] = {
                    ...item,
                    direction: item.direction === "asc" ? "desc" : "asc",
                };
                return newList;
            } else {
                // 不存在：新增
                const newItem: MultiSortItem = { columnId: colId, direction: "asc" };
                if (isShift) {
                    // shift点击：追加到排序列表尾部
                    return [...prev, newItem];
                } else {
                    // 普通单击：清空，只保留当前列
                    return [newItem];
                }
            }
        });
    };



    // ========== 分页 ==========
    const [currentPage, setCurrentPage] = createSignal(2);
    const pageSize = 2;
    const total = () => sortedData().length;
    const totalPages = () => Math.ceil(total() / pageSize);

    // 生成页码数组
    const pageNumbers = createMemo(() => {
        const current = currentPage();
        const totalP = totalPages();
        const pages: (number | "ellipsis")[] = [];
        const delta = 2;

        if (totalP <= 7) {
            for (let i = 1; i <= totalP; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > delta + 2) pages.push("ellipsis");

            const start = Math.max(2, current - delta);
            const end = Math.min(totalP - 1, current + delta);
            for (let i = start; i <= end; i++) pages.push(i);

            if (current < totalP - delta - 1) pages.push("ellipsis");
            pages.push(totalP);
        }
        return pages;
    });

    // 切片：排序完成后再分页
    const pageData = createMemo(() => {
        const start = (currentPage() - 1) * pageSize;
        const end = start + pageSize;
        return sortedData().slice(start, end);
    });
    const getPageNumbers = (current: number, totalPages: number) => {
        const pages: (number | "ellipsis")[] = [];
        const delta = 2;

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (current > delta + 2) pages.push("ellipsis");

            const start = Math.max(2, current - delta);
            const end = Math.min(totalPages - 1, current + delta);
            for (let i = start; i <= end; i++) pages.push(i);

            if (current < totalPages - delta - 1) pages.push("ellipsis");
            pages.push(totalPages);
        }
        return pages;
    };
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>DataTable</h1>
            <div>
                <DataTable.Root data={sortedData()} columns={columnsTable()} class="w-full" >
                <DataTable.Header  >
                    <tr class="border-b  border-gray-200 bg-gray-50">
                        {columnsTable().map((row) => (
                            <DataTable.HeaderCell class="border border-gray-200  text-center font-semibold text-gray-600" columnId="{row.id}" >
                                <button
                                type="button"
                                class="w-full  font-semibold px-4 py-3  text-gray-600 hover:bg-gray-100 select-none"
                                onClick={row.sortable ? (e) => handleHeaderClick(row.id, e) : undefined}
                            >
                                {row.header}
                                {(() => {
                                let info = getColumnSortInfo(row.id);
                                if (!info) {
                                    return <> {row.sortable ? "↕" : ""}</>;
                                }else{
                                    return <> {info.direction === "asc" ? "↑" : "↓"}</>;
                                }

                            })()}
                            </button>
                            </DataTable.HeaderCell>
                        ))}
                        <DataTable.HeaderCell columnId="action" class="border border-gray-200 text-center font-semibold text-gray-600">Action</DataTable.HeaderCell>
                        {/*<DataTable.HeaderCell columnId="id">Id</DataTable.HeaderCell>*/}
                        {/*<DataTable.HeaderCell columnId="name">Name</DataTable.HeaderCell>*/}
                        {/*<DataTable.HeaderCell columnId="year">Year</DataTable.HeaderCell>*/}
                        {/*<DataTable.HeaderCell columnId="paradigm">Paradigm</DataTable.HeaderCell>*/}
                    </tr>
                </DataTable.Header>
                <DataTable.Body>
                    {sortedData().map((row) => (
                        <DataTable.Row rowId={row.id} class="border-b border-gray-200 hover:bg-gray-100 ">
                            <DataTable.Cell class="border  border-gray-200  px-4 py-3">{row.id}</DataTable.Cell>
                            <DataTable.Cell class="border  border-gray-200  px-4 py-3">{row.name}</DataTable.Cell>
                            <DataTable.Cell class="border  border-gray-200  px-4 py-3">{row.year}</DataTable.Cell>
                            <DataTable.Cell class="border  border-gray-200  px-4 py-3">{row.paradigm}</DataTable.Cell>
                            <DataTable.Cell class="border  border-gray-200  px-4 py-3 text-end">
                                <span class="p-1"><Q_Button variant="primary" onClick={() => alert("clicked")}>Add</Q_Button></span>
                                <span class="p-1"> <Q_Button variant="secondary" onClick={() => alert("clicked")}>Edit</Q_Button></span>
                                <span class="p-1"> <Q_Button variant="danger" onClick={() => alert("clicked")}>Delete</Q_Button></span>
                                <span class="p-1"><Q_Button variant="ghost" onClick={() => alert("clicked")}>view</Q_Button></span>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable.Body>
            </DataTable.Root>
            <Table.Root class="w-full">
                <Table.Body class="border-b border-gray-100  data‑[selected]:bg-blue‑50 transition-colors">
                    <Table.Row  class="border  border-gray-200 hover:bg-gray-100 ">
                        <Table.Cell class="border-gray-200 px-4 py-3">Display [ 10 ] rows per page</Table.Cell>
                        <Table.Cell class="border-gray-200 px-4 py-3 flex justify-end">
                            {/* Pagination */}
                            <Pagination.Root
                                // total={total()}
                                // pageSize={pageSize}
                                // page={currentPage}
                                // onPageChange={setCurrentPage}
                            >
                                <Pagination.Content>
                                    <div class="flex gap-2 items-center mt-4">
                                        <div class="px-3 py-1.5 border rounded hover:bg-gray-100">Row : [ {total()} ]</div>
                                        <Pagination.PreviousButton
                                            class="px-3 py-1.5 border rounded hover:bg-blue-500 hover:text-white data-[disabled]:opacity-50"
                                        >
                                            Prev
                                        </Pagination.PreviousButton>

                                        <For each={getPageNumbers(currentPage(), Math.ceil(total() / pageSize))}>
                                            {(p) => (
                                                <>
                                                    {p === "ellipsis" ? (
                                                        <Pagination.Ellipsis class="px-2">…</Pagination.Ellipsis>
                                                    ) : (
                                                        <Pagination.Item
                                                            // page={p}
                                                            class= {currentPage()===p?"bg-blue-500 text-white px-3 py-1.5 border rounded hover:bg-blue-300 data-[active]:bg-slate-200":"px-3 py-1.5 border rounded hover:bg-blue-500 hover:text-white  data-[active]:bg-slate-200" }
                                                        >
                                                            {p}
                                                        </Pagination.Item>
                                                    )}
                                                </>
                                            )}
                                        </For>

                                        <Pagination.NextButton
                                            class="px-3 py-1.5 border rounded hover:bg-blue-500 hover:text-white data-[disabled]:opacity-50"
                                        >
                                            Next
                                        </Pagination.NextButton>
                                    </div>
                                </Pagination.Content>
                            </Pagination.Root>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table.Root>
            </div>
        </main>
    );
}