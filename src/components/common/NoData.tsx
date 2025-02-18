import React from 'react'

interface Props {
    message: string
    customStyle?: string
}

function NoData({ message, customStyle }: Props) {
    return (
        <div
            className={` w-full h-full flex justify-center items-center rounded-[12px] border border-line ${customStyle}`}
        >
            <div className="flex justify-center flex-col items-center py-3">
                <p className="text-[14px] text-oslo_grey mt-2 text-center">{message}</p>
            </div>
        </div>
    )
}

export default NoData
