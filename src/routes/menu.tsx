import type { ParentProps } from 'solid-js';
import * as Menu from "@solidiom/menu"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function menuLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Menu</h1>
            <div>
                <Menu.Root>Menu content</Menu.Root>
            </div>
        </main>
    );
}