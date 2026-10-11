import * as DatePicker from "@solidiom/date-picker";
import {Icon} from "@iconify-icon/solid";
import {ComponentProps, createSignal, type ParentProps} from "solid-js";
import {DateValue} from "@solidiom/date-picker";
import * as Input from "@solidiom/input";

type DatePickerProps = {
    // 必须传入 signal getter：如 selectedValue （不带括号）
    value: () => DateValue | undefined;
    onChange: (val: DateValue | undefined) => void;
    placeholder?: string;
    color?: InputColor;
};
export type InputColor = "blue" | "green" | "yellow" | "gray" | "red";

const colorClassMap: Record<InputColor, string> = {
    blue: " border-blue-300 focus:ring-blue-500 focus:border-blue-500 hover:border-blue-300",
    green: " border-green-300 focus:ring-emerald-500 focus:border-emerald-500 hover:border-emerald-300",
    yellow: " border-yellow-300 focus:ring-amber-500 focus:border-amber-500 hover:border-amber-300",
    gray: " border-gray-300 focus:ring-slate-500 focus:border-slate-500 hover:border-slate-300",
    red: " border-red-300 focus:ring-red-500 focus:border-red-500 hover:border-red-300",
};
export function Q_Date(props: DatePickerProps) {
    const color = props.color?props.color:"blue" ;
    const baseClass = [
        "px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ",
        colorClassMap[color]
    ].join(" ");
    return (

        <DatePicker.Root
    value={props.value}
    onValueChange={(val) => {
        console.log(val);
        props.onChange(val);
    }}
        >
            {/* 输入框美化 */}
            <div class="flex items-center gap-1">
                <DatePicker.Input
                    placeholder={props.placeholder ?? "Select a date"}
                    class={baseClass}
                />
                <DatePicker.Trigger class="px-3 py-2 text-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    <Icon icon="fontisto:date" width="28" height="28"/>
                </DatePicker.Trigger>
            </div>

            {/* 弹窗面板美化 */}
            <DatePicker.Content class="bg-white shadow-lg border border-gray-200 rounded-lg p-3 mt-1 z-50">
                <DatePicker.Calendar>
                    <DatePicker.Header class="text-2xl text-center font-medium " />
                    <DatePicker.Grid>
                        {(weeks) =>
                            weeks().map((week, wi) => (
                                <tr key={wi}>
                                    {week.map((day, di) =>
                                        day > 0 ? (
                                            <DatePicker.Cell
                                                key={`${wi}-${di}`}
                                                day={day}
                                                class="p-3 w-8 h-8 text-center rounded hover:bg-gray-100 data-[selected]:bg-blue-600 data-[selected]:text-white cursor-pointer transition-colors"
                                            />
                                        ) : (
                                            <td key={`${wi}-${di}`} class="p-3"/>
                                        )
                                    )}
                                </tr>
                            ))
                        }
                    </DatePicker.Grid>
                </DatePicker.Calendar>
            </DatePicker.Content>
        </DatePicker.Root>
    );
}