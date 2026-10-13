import {JSX} from "@solidjs/web";
import {createEffect, createMemo, createSignal, onCleanup, untrack} from "solid-js";

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function useMedia(query: string) {
    const [matches, setMatches] = createSignal(false);

    createEffect(
        () => typeof window !== "undefined",
        (hasWindow) => {
            untrack(() => {
                if (!hasWindow) return;
                const mql = window.matchMedia(query);
                const update = () => setMatches(mql.matches);
                update();
                mql.addEventListener("change", update);
            });
        }
    );

    return matches;
}

interface Q_RowProps {
    gutter?: [number, number];
    justify?: "start" | "center" | "end" | "between" | "around";
    align?: "start" | "center" | "end";
    class?: string;
    children?: JSX.Element;
}
export function Q_ResRow(props: Q_RowProps) {
    const { gutter = [0, 0], justify, align, class: className } = props;
    const [gx] = gutter;
    const rowStyle: JSX.CSSProperties = {};
    if (gx > 0) {
        rowStyle["margin-left"] = `${-gx / 2}px`;
        rowStyle["margin-right"] = `${-gx / 2}px`;
    }

    return (
        <div
            class={`w-full flex flex-wrap ${justify ? `justify-${justify}` : ""} ${align ? `items-${align}` : ""} ${className ?? ""}`}
            style={rowStyle}
        >
            {props.children}
        </div>
    );
}

interface Q_ColProps {
    responsive: Partial<Record<Breakpoint, number>>;
    gutter?: [number, number];
    class?: string;
    children?: JSX.Element;
}
export function Q_ResCol(props: Q_ColProps) {
    const isSm = useMedia("(min-width:640px)");
    const isMd = useMedia("(min-width:768px)");
    const isLg = useMedia("(min-width:1024px)");
    const isXl = useMedia("(min-width:1280px)");

    const span = createMemo(() => {
        const resp = props.responsive;
        let val = resp.xs ?? 24;
        if (isSm() && resp.sm != null) val = resp.sm;
        if (isMd() && resp.md != null) val = resp.md;
        if (isLg() && resp.lg != null) val = resp.lg;
        if (isXl() && resp.xl != null) val = resp.xl;
        return val;
    });

    const [gx, gy] = props.gutter ?? [0, 0];
    const colStyle = createMemo((): JSX.CSSProperties => {
        const pct = (span() / 24) * 100;
        return {
            flex: `0 0 ${pct}%`,
            "max-width": `${pct}%`,
            "padding-left": gx ? `${gx / 2}px` : undefined,
            "padding-right": gx ? `${gx / 2}px` : undefined,
            "padding-top": gy ? `${gy / 2}px` : undefined,
            "padding-bottom": gy ? `${gy / 2}px` : undefined,
        };
    });

    return (
        <div class={props.class ?? ""} style={colStyle()}>
            {props.children}
        </div>
    );
}