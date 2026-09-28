import type { ParentProps } from 'solid-js';
import * as Alert from "@solidiom/alert"
import {Q_Alert} from "../components/Alter";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function tableLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>Alert</h1>
            <div class="space-y-4">
                    <Alert.Root type="info" class="p-4 rounded-lg border border-blue-200 bg-blue-50">
                        <Alert.Title class="font-medium text-blue-800">Information</Alert.Title>
                        <Alert.Description class="mt-1 text-sm text-blue-700">
                            A new feature is available in your dashboard.
                        </Alert.Description>
                    </Alert.Root>

                    <Alert.Root type="success" class="p-4 rounded-lg border border-green-200 bg-green-50">
                        <Alert.Title class="font-medium text-green-800">Success</Alert.Title>
                        <Alert.Description class="mt-1 text-sm text-green-700">
                            Your changes have been saved.
                        </Alert.Description>
                    </Alert.Root>

                    <Alert.Root type="warning" class="p-4 rounded-lg border border-amber-200 bg-amber-50">
                        <Alert.Title class="font-medium text-amber-800">Warning</Alert.Title>
                        <Alert.Description class="mt-1 text-sm text-amber-700">
                            You are approaching your storage limit.
                        </Alert.Description>
                    </Alert.Root>

                    <Alert.Root type="error" class="p-4 rounded-lg border border-red-200 bg-red-50">
                        <Alert.Title class="font-medium text-red-800">Error</Alert.Title>
                        <Alert.Description class="mt-1 text-sm text-red-700">
                            Failed to connect to the server.
                        </Alert.Description>
                    </Alert.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> Q_Alert components</h1>
            <div>

                <div class="space-y-4">
                    <Q_Alert type="info" title="Information" description="A new feature is available in your dashboard." />
                    <Q_Alert type="success" title="Success" description="Your changes have been saved." />
                    <Q_Alert type="warning" title="Warning" description="You are approaching your storage limit." />
                    <Q_Alert type="error" title="Error" description="Failed to connect to the server." />
                </div>
            </div>
        </main>
    );
}