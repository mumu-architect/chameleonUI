import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import * as Input from "@solidiom/input";
import {Q_Input} from "../components/Input";

export default function inputLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>
            <h1 class="font-medium text-red-800 border-b">Input</h1>

            <div class="flex flex-direction gap-12">
                <Input.Root type="text" placeholder="Enter your name"  class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="email" placeholder="you@example.com" required class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="password" placeholder="••••••••" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="text" disabled placeholder="Cannot edit" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="text" invalid placeholder="Has error" aria-invalid="true" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
            </div>

            <h1 class="font-medium text-red-800 border-b">Input conponents</h1>

            <div class="flex flex-direction gap-12">
                <Q_Input type="text" placeholder="Default Blue" />
                <Q_Input color="green" type="text" placeholder="green" />
                <Q_Input color="yellow" type="text" placeholder="yellow" />
                <Q_Input color="gray" type="text" placeholder="gray" />
                <Q_Input color="red" type="text" placeholder="red" />
                <Q_Input invalid aria-invalid="true" type="text" placeholder="Has error" />
                <Q_Input class="w-64" type="text" placeholder="Custom Width" />
            </div>
        </main>
    );
}