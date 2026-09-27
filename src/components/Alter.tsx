import * as SolidiomAlert  from "@solidiom/alert";
import type { AlertType } from "@solidiom/alert";

type Props = {
    type: AlertType;
    title: string;
    description?: string;
};

export function Q_Alert(props: Props) {
    const rootClass = {
        info: "p-4 rounded-lg border border-blue-200 bg-blue-50",
        success: "p-4 rounded-lg border border-green-200 bg-green-50",
        warning: "p-4 rounded-lg border border-amber-200 bg-amber-50",
        error: "p-4 rounded-lg border border-red-200 bg-red-50",
    }[props.type];

    const titleClass = {
        info: "font-medium text-blue-800",
        success: "font-medium text-green-800",
        warning: "font-medium text-amber-800",
        error: "font-medium text-red-800",
    }[props.type];

    const descClass = {
        info: "mt-1 text-sm text-blue-700",
        success: "mt-1 text-sm text-green-700",
        warning: "mt-1 text-sm text-amber-700",
        error: "mt-1 text-sm text-red-700",
    }[props.type];
    return (
        <SolidiomAlert.Root type={props.type} class={rootClass}>
            <SolidiomAlert.Title class={titleClass}>{props.title}</SolidiomAlert.Title>
            {props.description && (
                <SolidiomAlert.Description class={descClass}>{props.description}</SolidiomAlert.Description>
            )}
        </SolidiomAlert.Root>
    );
}
