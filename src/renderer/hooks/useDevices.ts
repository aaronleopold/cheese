import { useEffect, useMemo, useState } from 'react';

export interface Devices {
    audioinputs: MediaDeviceInfo[];
    videoinputs: MediaDeviceInfo[];
}

export interface SelectedDevices {
    audioinput?: MediaDeviceInfo;
    videoinput?: MediaDeviceInfo;
}

const initialDevices: Devices = {
    audioinputs: [],
    videoinputs: [],
};

export default function useDevices() {
    const [devices, setDevices] = useState<Devices>();
    const [selectedDevices, setSelectedDevices] = useState<SelectedDevices>();

    useEffect(() => {
        async function init() {
            let mediaDevices = await navigator.mediaDevices.enumerateDevices();

            let newDevices = initialDevices;

            mediaDevices.forEach((device) => {
                if (device.kind === 'videoinput') {
                    newDevices.videoinputs.push(device);
                } else if (device.kind === 'audioinput') {
                    newDevices.audioinputs.push(device);
                }
            });

            let _selectedDevices: SelectedDevices = {};

            if (newDevices.audioinputs.length) {
                _selectedDevices.audioinput = newDevices.audioinputs[0];
            }

            if (newDevices.videoinputs.length) {
                _selectedDevices.videoinput = newDevices.videoinputs[0];
            }

            setSelectedDevices(_selectedDevices);
            setDevices(newDevices);
        }

        if (!devices) {
            init();
        }
    }, [devices]);

    const mutators = useMemo(
        () => ({
            selectDevice(mediaDevice: MediaDeviceInfo) {
                if (mediaDevice.kind === 'audioinput') {
                    setSelectedDevices((curr) => ({
                        ...curr,
                        audioinput: mediaDevice,
                    }));
                } else if (mediaDevice.kind === 'videoinput') {
                    setSelectedDevices((curr) => ({
                        ...curr,
                        videoinput: mediaDevice,
                    }));
                }
            },
        }),
        [setSelectedDevices]
    );

    return [devices, selectedDevices, mutators] as const;
}