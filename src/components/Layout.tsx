import {JSX} from "@solidjs/web";

interface RowProps {
    gutter?: [number, number];
    rowGap?: number;
    justify?: "start" | "center" | "end" | "between" | "around";
    align?: "start" | "center" | "end";
    class?: string;
    children?: JSX.Element;
}
export function Q_Row(props: RowProps) {
    const { gutter = [0, 0], rowGap, justify, align, class: className } = props;
    const [gx, gy] = gutter;

    const style: JSX.CSSProperties = {};

    if (gx > 0) {
        style["margin-left"] = `${-gx / 2}px`;
        style["margin-right"] = `${-gx / 2}px`;
    }

    if (gy > 0) {
        style["margin-top"] = `${-gy / 2}px`;
        style["margin-bottom"] = `${-gy / 2}px`;
    }

    if (rowGap != null) {
        style["row-gap"] = `${rowGap}px`;
    }

    return (
        <div
            class={`w-full flex flex-wrap ${justify ? `justify-${justify}` : ""} ${align ? `items-${align}` : ""} ${className ?? ""}`}
            style={style}
        >
            {props.children}
        </div>
    );
}

interface ColProps {
    span?: number;
    gutter?: [number, number];
    offset?: number;
    class?: string;
    children?: JSX.Element;
}

export function Q_Col(props: ColProps) {
    const { span = 24, gutter, offset, class: className } = props;
    const [gx, gy] = gutter ?? [0, 0];
    const pct = span / 24 * 100;

    const style: JSX.CSSProperties = {
        "flex-shrink": 0,
        "flex-grow": 0,
        "flex-basis": `${pct}%`,
        "max-width": `${pct}%`,
    };

    if (offset) {
        style["margin-left"] = `${offset / 24 * 100}%`;
    }
    if (gy && gy > 0) {
        style["padding-top"] = `${gy / 2}px`;
        style["padding-bottom"] = `${gy / 2}px`;
    }
    if (gx && gx > 0) {
        style["padding-left"] = `${gx / 2}px`;
        style["padding-right"] = `${gx / 2}px`;
    }

    return (
        <div
            class={className ?? ""}
            style={style}
        >
            {props.children}
        </div>
    );
}