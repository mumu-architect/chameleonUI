import type { ParentProps } from 'solid-js';
import * as Pagination from "@solidiom/pagination"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function paginationLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>About</h1>

            <div>
                <Pagination.Root>Pagination content</Pagination.Root>
            </div>
        </main>
    );
}