
import type { ParentProps } from 'solid-js';

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function iconLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>Icon</h1>

            <div class="font-bold">
               Websit: https://icon-sets.iconify.design/?query=pagination
            </div>
            <iframe src="https://icon-sets.iconify.design/?query=pagination" name="icon" class="w-full  h-500"></iframe>
        </main>
    );
}