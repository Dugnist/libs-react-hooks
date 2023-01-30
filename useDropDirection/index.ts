import * as React from 'react';

export enum VerticalDropDirection {
    UP = 'up',
    DOWN = 'down'
}

export enum HorizontalDropDirection {
    LEFT = 'left',
    RIGHT = 'right'
}

export const useDropDirection = (ref, dependency) => {
    const [
        verticalDropDirection,
        setVerticalDropDirection,
    ] = React.useState<VerticalDropDirection>(VerticalDropDirection.UP);
    const [
        horizontalDropDirection,
        setHorizontalDropDirection,
    ] = React.useState<HorizontalDropDirection>(HorizontalDropDirection.RIGHT);

    React.useEffect(() => {
        const position = ref?.current?.getBoundingClientRect();
        const y = position?.y ?? 0;
        const vh = Math.max(document.documentElement.clientHeight ?? 0, window.innerHeight ?? 0);
        setVerticalDropDirection(vh - y > (ref?.current?.clientHeight ?? 0)
            ? VerticalDropDirection.DOWN
            : VerticalDropDirection.UP,
        );
        const x = position?.x ?? 0;
        const vw = Math.max(document.documentElement.clientWidth ?? 0, window.innerWidth ?? 0);
        setHorizontalDropDirection(vw - x > (ref?.current?.clientWidth ?? 0)
            ? HorizontalDropDirection.RIGHT
            : HorizontalDropDirection.LEFT,
        );
    }, [dependency]);

    return [verticalDropDirection, horizontalDropDirection];
};
