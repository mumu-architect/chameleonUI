import type { ParentProps } from 'solid-js';

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function aboutLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 bg-amber-600">
            <h1>About</h1>
            {props.children}
        </main>
    );
}