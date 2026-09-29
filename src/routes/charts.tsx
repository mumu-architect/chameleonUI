import type { ParentProps } from 'solid-js';

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function ChartsLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Charts</h1>
            {props.children}
        </main>
    );
}