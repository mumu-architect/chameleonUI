import {createMemo, createSignal, For, ParentProps} from 'solid-js';
import * as Pagination from "@solidiom/pagination"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.

type LangItem = {
    id: string;
    name: string;
    year: string;
    paradigm: string;
};

type TableColumn = {
    id: string;
    header: string;
    sortable: boolean;
};

type MultiSortItem = {
    columnId: string;
    direction: "asc" | "desc";
};
export default function paginationLayout(props: ParentProps) {

    const rawData: LangItem[] = [
        { id: "3", name: "Haskell", year: "1990", paradigm: "Functional" },
        { id: "1", name: "C", year: "1972", paradigm: "Procedural" },
        { id: "2", name: "Java", year: "1995", paradigm: "OOP" },
        { id: "4", name: "C", year: "1978", paradigm: "Procedural" },
        { id: "5", name: "Rust", year: "2010", paradigm: "Systems" },
        { id: "6", name: "Go", year: "2009", paradigm: "Systems" },
        { id: "7", name: "Haskell", year: "1990", paradigm: "Functional" },
        { id: "8", name: "C", year: "1972", paradigm: "Procedural" },
        { id: "9", name: "Java", year: "1995", paradigm: "OOP" },
        { id: "10", name: "C", year: "1978", paradigm: "Procedural" },
        { id: "11", name: "Rust", year: "2010", paradigm: "Systems" },
        { id: "12", name: "Go", year: "2009", paradigm: "Systems" },
        { id: "13", name: "Haskell", year: "1990", paradigm: "Functional" },
        { id: "14", name: "C", year: "1978", paradigm: "Procedural" },
        { id: "15", name: "Rust", year: "2010", paradigm: "Systems" },
        { id: "16", name: "Go", year: "2009", paradigm: "Systems" },
        { id: "17", name: "Haskell", year: "1990", paradigm: "Functional" },
        { id: "18", name: "C", year: "1972", paradigm: "Procedural" },
        { id: "19", name: "Java", year: "1995", paradigm: "OOP" },
        { id: "20", name: "C", year: "1978", paradigm: "Procedural" },
        { id: "21", name: "Rust", year: "2010", paradigm: "Systems" },
        { id: "22", name: "Go", year: "2009", paradigm: "Systems" },
    ];

    // ========== 多列排序 ==========
    const [sortList, setSortList] = createSignal<MultiSortItem[]>([
        { columnId: "id", direction: "asc" },
    ]);

    const handleHeaderClick = (colId: string, e: MouseEvent) => {
        const isShift = e.shiftKey;
        setSortList(prev => {
            const existIdx = prev.findIndex(s => s.columnId === colId);
            if (existIdx >= 0) {
                const newList = [...prev];
                const item = newList[existIdx];
                newList[existIdx] = {
                    ...item,
                    direction: item.direction === "asc" ? "desc" : "asc",
                };
                return newList;
            } else {
                const newItem: MultiSortItem = { columnId: colId, direction: "asc" };
                if (isShift) return [...prev, newItem];
                return [newItem];
            }
        });
    };

    const sortedData = createMemo(() => {
        const sorts = sortList();
        return [...rawData].sort((a, b) => {
            for (const s of sorts) {
                const valA = a[s.columnId as keyof LangItem];
                const valB = b[s.columnId as keyof LangItem];
                let cmp = 0;
                if (s.columnId === "id" || s.columnId === "year") {
                    const numA = Number(valA);
                    const numB = Number(valB);
                    cmp = numA - numB;
                } else {
                    cmp = String(valA).localeCompare(String(valB));
                }
                if (cmp !== 0) return s.direction === "asc" ? cmp : -cmp;
            }
            return 0;
        });
    });

    const getColumnSortDirection = (colId: string): "asc" | "desc" | null => {
        const sorts = sortList();
        const find = sorts.find(x => x.columnId === colId);
        return find?.direction ?? null;
    };

    const getColumnSortIcon = (colId: string) => {
        const dir = getColumnSortDirection(colId);
        if (dir === "asc") return "↑";
        if (dir === "desc") return "↓";
        return "↕";
    };

    const columnsTable = (): TableColumn[] => [
        { id: "id", header: "Id", sortable: true },
        { id: "name", header: "Name", sortable: true },
        { id: "year", header: "Year", sortable: true },
        { id: "paradigm", header: "Paradigm", sortable: false },
    ];


    // ========== 分页 ==========
    const [currentPage, setCurrentPage] = createSignal(6);
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
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>Pagination</h1>

            <div>
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
            </div>
            <div>
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
                                class="px-3 py-1.5 border rounded hover:bg-green-500 hover:text-white data-[disabled]:opacity-50"
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
                                                class= {currentPage()===p?"bg-green-500 text-white px-3 py-1.5 border rounded hover:bg-green-300 data-[active]:bg-slate-200":"px-3 py-1.5 border rounded hover:bg-green-500 hover:text-white  data-[active]:bg-slate-200" }
                                            >
                                                {p}
                                            </Pagination.Item>
                                        )}
                                    </>
                                )}
                            </For>

                            <Pagination.NextButton
                                class="px-3 py-1.5 border rounded hover:bg-green-500 hover:text-white  data-[disabled]:opacity-50"
                            >
                                Next
                            </Pagination.NextButton>
                        </div>
                    </Pagination.Content>
                </Pagination.Root>
            </div>
            <div>
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
                                class="px-3 py-1.5 border rounded hover:bg-red-500 hover:text-white data-[disabled]:opacity-50"
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
                                                class= {currentPage()===p?"bg-red-500 text-white px-3 py-1.5 border rounded hover:bg-red-300 data-[active]:bg-slate-200":"px-3 py-1.5 border rounded hover:bg-red-500 hover:text-white  data-[active]:bg-slate-200" }
                                            >
                                                {p}
                                            </Pagination.Item>
                                        )}
                                    </>
                                )}
                            </For>

                            <Pagination.NextButton
                                class="px-3 py-1.5 border rounded hover:bg-red-500 hover:text-white  data-[disabled]:opacity-50"
                            >
                                Next
                            </Pagination.NextButton>
                        </div>
                    </Pagination.Content>
                </Pagination.Root>
            </div>
            <div>
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
                                class="px-3 py-1.5 border rounded hover:bg-gray-500 hover:text-white data-[disabled]:opacity-50"
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
                                                class= {currentPage()===p?"bg-gray-500 text-white px-3 py-1.5 border rounded hover:bg-gray-300 data-[active]:bg-slate-200":"px-3 py-1.5 border rounded hover:bg-gray-500 hover:text-white  data-[active]:bg-slate-200" }
                                            >
                                                {p}
                                            </Pagination.Item>
                                        )}
                                    </>
                                )}
                            </For>

                            <Pagination.NextButton
                                class="px-3 py-1.5 border rounded hover:bg-gray-500 hover:text-white  data-[disabled]:opacity-50"
                            >
                                Next
                            </Pagination.NextButton>
                        </div>
                    </Pagination.Content>
                </Pagination.Root>
            </div>
        </main>
    );
}