import type { ParentProps } from 'solid-js';
import * as DatePicker from "@solidiom/date-picker"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function datePickerLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>DatePicker</h1>
            <div>
                <DatePicker.Root onValueChange={(date) => console.log(date)}>
                    <DatePicker.Input placeholder="Select a date" />

                    <DatePicker.Trigger>📅</DatePicker.Trigger>

                    <DatePicker.Content>
                        <DatePicker.Calendar>
                            <DatePicker.Header />

                            <DatePicker.Grid>
                                {(weeks) =>
                                    weeks().map((week, wi) => (
                                        <tr key={wi}>
                                            {week.map((day, di) =>
                                                day > 0 ? (
                                                    <DatePicker.Cell key={`${wi}-${di}`} day={day} />
                                                ) : (
                                                    <td key={`${wi}-${di}`} />
                                                ),
                                            )}
                                        </tr>
                                    ))
                                }
                            </DatePicker.Grid>
                        </DatePicker.Calendar>
                    </DatePicker.Content>
                </DatePicker.Root>
            </div>
        </main>
    );
}