import {For} from "solid-js";
import * as Checkbox from "@solidiom/checkbox"


type CheckboxOption = {
    value: string;
    label: string;
};
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
interface CheckboxGroupProps {
    value: string[];
    onValueChange: (v: string[]) => void;
    options: CheckboxOption[];
    color?:InputColor;
}

const ColorClassMap:Record<InputColor, string>={
    blue: "border-blue-500 bg-blue-500 ",
    green: "border-green-500 bg-green-500  ",
    yellow: "border-yellow-500 bg-yellow-500 ",
    gray: "border-gray-500 bg-gray-500 ",
    red: "border-red-500 bg-red-500 ",
}
export function Q_CheckboxGroup(props: CheckboxGroupProps) {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]
    return (
        <Checkbox.Group
            value={() => props.value ?? []}
            onValueChange={props.onValueChange}
            class="flex flex-row flex-newline gap-4  py-2 "
        >
            <For each={props.options}>
                {(item) => (
                    <Checkbox.Root
                        value={item.value}
                        class="flex items-center gap-2 cursor-pointer select-none shrink-0"
                    >
            <span
                class={
                    props.value.includes(item.value)
                        ? `${baseColor}  w-4 h-4 rounded border  cursor-pointer flex items-center justify-center shrink-0`
                        : "w-4 h-4 rounded border border-gray-400 bg-white flex items-center justify-center shrink-0"
                }
            >
              <span
                  class={
                      props.value.includes(item.value)
                          ? "text-white text-xs leading-none"
                          : "hidden"
                  }
              >
                ✓
              </span>
            </span>
                        <span class="text-sm text-gray-800 whitespace-nowrap">
              {item.label}
            </span>
                    </Checkbox.Root>
                )}
            </For>
        </Checkbox.Group>
    );
}