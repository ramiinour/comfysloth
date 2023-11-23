import React from 'react'

type Props = {
    className?: string
}

const ArrowDown = ({ className }: Props) => {
    return (
        <svg
            width="9"
            height="6"
            className={className}
            viewBox="0 0 9 6"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                id="Vector"
                d="M8.83368 0.558795C8.89329 0.618402 8.92309 0.686949 8.92309 0.764438C8.92309 0.841926 8.89329 0.910473 8.83368 0.97008L4.66719 5.13657C4.60758 5.19618 4.53903 5.22598 4.46154 5.22598C4.38406 5.22598 4.31551 5.19618 4.2559 5.13657L0.0894097 0.97008C0.0298032 0.910473 0 0.841926 0 0.764438C0 0.686949 0.0298032 0.618402 0.0894097 0.558795L0.536458 0.111746C0.596065 0.0521398 0.664612 0.022337 0.742101 0.022337C0.819589 0.022337 0.888137 0.0521398 0.947743 0.111746L4.46154 3.62555L7.97535 0.111746C8.03495 0.0521398 8.1035 0.022337 8.18099 0.022337C8.25848 0.022337 8.32703 0.0521398 8.38663 0.111746L8.83368 0.558795Z"
            />
        </svg>
    )
}

export default ArrowDown