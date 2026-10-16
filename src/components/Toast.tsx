import * as Toast from "@solidiom/toast"

export type ToastRegionProps = {
    // toaster: Toast.Toaster;
    toaster: ReturnType<typeof Toast.createToaster>;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    width?: string;
    class?: string;
    color?:InputColor;
};
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";


const colorClassMap: Record<InputColor, string> = {
    blue: "border-blue-200 bg-blue-100 ",
    green: "border-green-200 bg-green-100 ",
    yellow: "border-yellow-200 bg-yellow-100 ",
    gray: "border-gray-200 bg-gray-100 ",
    red: "border-red-200 bg-red-50  text-red-800 ",
};
const titleColorClassMap: Record<InputColor, string> = {
    blue: " text-blue-800 ",
    green: " text-green-800 ",
    yellow: " text-yellow-800 ",
    gray: " text-gray-800 ",
    red: " text-red-800 ",
};
const descColorClassMap: Record<InputColor, string> = {
    blue: " text-blue-700 ",
    green: " text-green-700 ",
    yellow: " text-yellow-700 ",
    gray: " text-gray-700 ",
    red: " text-red-700 ",
};
export function Q_Toast(props: ToastRegionProps) {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=colorClassMap[ColorName]
    let titleColor=titleColorClassMap[ColorName]
    let descColor=descColorClassMap[ColorName]

    //显示位置
    const posClass = {
        "top-right": "fixed top-4 right-4",
        "top-left": "fixed top-4 left-4",
        "bottom-right": "fixed bottom-4 right-4",
        "bottom-left": "fixed bottom-4 left-4",
    }[props.position ?? "top-right"];
    return (
        <div
            class={`${posClass} fixed  z-[9999] flex flex-col gap-3 ${props.width ?? "w-[360px]"} ${props.class ?? ""}`}
        >
            <Toast.Region toaster={props.toaster}>
                {(toasts) =>
                    toasts().map((entry) => (
                        <Toast.Root
                            toastId={entry.id}
                            class={`${baseColor} relative  border shadow-lg rounded-lg p-4 transition-all duration-200
                data-[closed]:opacity-0 data-[closed]:translate-x-8
                data-[open]:opacity-100 data-[open]:translate-x-0`}
                        >
                            <div class="flex items-start justify-between gap-2">
                                <div class="flex-1">
                                    <Toast.Title class={`${titleColor} font-semibold  text-base`}>
                                        {entry.title}
                                    </Toast.Title>
                                    {entry.description && (
                                        <Toast.Description class={`${descColor} mt-1 text-sm `}>
                                            {entry.description}
                                        </Toast.Description>
                                    )}
                                </div>
                                <Toast.Close class="shrink-0 text-gray-400 hover:text-gray-900 text-xl leading-none cursor-pointer">
                                    ×
                                </Toast.Close>
                            </div>
                        </Toast.Root>
                    ))
                }
            </Toast.Region>
        </div>


    );
}