import { useEffect, useState } from "react";

/**
 * Dispatches a custom event with a specified name and details.
 * 
 * @param eventName The name of the custom event.
 * @param detail The data to be attached to the event's 'detail' property.
 */
export function raiseCustomEvent<T>(eventName: string, detail: T, canvasLayer?: any): void {
    // Create a custom event with the given name and detail
    const event = new CustomEvent<T>(eventName, { detail, bubbles: true });
    // Dispatch the event on the window object or another suitable target
    if (canvasLayer) {
        canvasLayer.dispatchEvent(event);
    }
    else {
        document.body.dispatchEvent(event);
    }
}


// The hook can optionally accept a callback to be executed when the event is triggered
export const useCustomEventListener = <T extends any>(eventName: string, callback: (detail: T) => void) => {
    const [value, setValue] = useState<any>(null)
    useEffect(() => {
        // Event handler to call the provided callback
        const handler = (event: CustomEvent<T>) => {
            callback(event.detail);
            setValue(event.detail);
        };

        // Add event listener
        window.addEventListener(eventName, handler as EventListener);

        // Clean up
        return () => {
            window.removeEventListener(eventName, handler as EventListener);
        };
    }, [callback]); // Re-run the effect if the callback changes
    return { detail: value }
};