import { ISpec, VChart } from "@visactor/react-vchart"

interface SmoothedAreaProps {}

const spec: ISpec = {
    type: "area",
    axes: [
        {
            orient: "bottom",
            label: {
                autoLimit: true,
                style: {
                    fill: "#595959",
                },
            },
        },
        {
            orient: "left",
            maxWidth: 65,
            label: {
                autoLimit: true,
                style: {
                    fill: "#595959",
                },
            },
        },
    ],
    data: {
        values: [
            {
                time: "2:00",
                value: 38,
            },
            {
                time: "4:00",
                value: 56,
            },
            {
                time: "6:00",
                value: 10,
            },
            {
                time: "8:00",
                value: 70,
            },
            {
                time: "10:00",
                value: 36,
            },
            {
                time: "12:00",
                value: 94,
            },
            {
                time: "14:00",
                value: 24,
            },
            {
                time: "16:00",
                value: 44,
            },
            {
                time: "18:00",
                value: 36,
            },
            {
                time: "20:00",
                value: 68,
            },
            {
                time: "22:00",
                value: 22,
            },
        ],
    },
    xField: "time",
    yField: "value",
    line: {
        style: {
            curveType: "monotone",
        },
    },
}

const SmoothedArea: React.FC<SmoothedAreaProps> = () => {
    return <VChart spec={spec}></VChart>
}
export default SmoothedArea
