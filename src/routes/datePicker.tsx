import {createSignal, ParentProps} from 'solid-js';
import * as DatePicker from "@solidiom/date-picker"
import {DateValue} from "@solidiom/date-picker";
import {Icon} from "@iconify-icon/solid";
import {Q_Date} from "../components/Date";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
function dateToValue(d: Date): DateValue {
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
}
function valueToDate(v?: DateValue): Date | undefined {
    if (!v) return undefined;
    return new Date(v.year, v.month - 1, v.day);
}
function dateToValue2(d: Date): DateValue {
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()+2 };
}

export default function datePickerLayout(props: ParentProps) {
    const [selectedValue, setSelectedValue] = createSignal<DateValue | undefined>();
    const [selectedDateValue, setSelectedDateValue] = createSignal<DateValue | undefined>();

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>DatePicker</h1>
            <h1 class="font-medium text-red-800 border-b">DatePicker </h1>
            <div class="flex flex-direction gap-12">
                <DatePicker.Root
                    value={selectedValue}
                    onValueChange={(val) => {
                        console.log(val);
                        setSelectedValue(val);
                    }}
                >
                    {/* 输入框美化 */}
                    <div class="flex items-center gap-1">
                        <DatePicker.Input
                            placeholder={ "Select a date"}
                            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </div>

            <h1 class="font-medium text-red-800 border-b">DatePicker components </h1>
            <div class="flex flex-direction gap-12">
            <Q_Date
                value={selectedDateValue}
                onChange={(val) => {
                    setSelectedDateValue(val);
                    console.log("选中DateValue：", val);
                    const nativeDate = valueToDate(val);
                    console.log("原生Date对象：", nativeDate);
                }}
                placeholder="Please select a date"
                color="blue"
            />
                <Q_Date
                    value={selectedDateValue}
                    onChange={(val) => {
                        setSelectedDateValue(val);
                        console.log("选中DateValue：", val);
                        const nativeDate = valueToDate(val);
                        console.log("原生Date对象：", nativeDate);
                    }}
                    placeholder="Please select a date"
                    color="green"
                />
                <Q_Date
                    value={selectedDateValue}
                    onChange={(val) => {
                        setSelectedDateValue(val);
                        console.log("选中DateValue：", val);
                        const nativeDate = valueToDate(val);
                        console.log("原生Date对象：", nativeDate);
                    }}
                    placeholder="Please select a date"
                    color="yellow"
                />
                <Q_Date
                    value={selectedDateValue}
                    onChange={(val) => {
                        setSelectedDateValue(val);
                        console.log("选中DateValue：", val);
                        const nativeDate = valueToDate(val);
                        console.log("原生Date对象：", nativeDate);
                    }}
                    placeholder="Please select a date"
                    color="gray"
                />
                <Q_Date
                    value={selectedDateValue}
                    onChange={(val) => {
                        setSelectedDateValue(val);
                        console.log("选中DateValue：", val);
                        const nativeDate = valueToDate(val);
                        console.log("原生Date对象：", nativeDate);
                    }}
                    placeholder="Please select a date"
                    color="red"
                />

            </div>
        </main>
    );
}