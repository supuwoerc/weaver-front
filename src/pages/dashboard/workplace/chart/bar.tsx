import { ISpec, VChart } from "@visactor/react-vchart"

interface BarProps {}

const spec: ISpec = {
    type: "bar",
    data: [
        {
            id: "barData",
            values: [
                {
                    province: "北京",
                    value: 3080,
                },
                {
                    province: "天津",
                    value: 2880,
                },
                {
                    province: "重庆",
                    value: 880,
                },
                {
                    province: "深圳",
                    value: 780,
                },
                {
                    province: "广州",
                    value: 680,
                },
                {
                    province: "山东",
                    value: 580,
                },
                {
                    province: "浙江",
                    value: 480,
                },
                {
                    province: "福建",
                    value: 100,
                },
            ],
        },
    ],
    direction: "horizontal",
    xField: "value",
    yField: "province",
    seriesField: "province",
    padding: { right: 50, left: 10 },
    axes: [
        {
            orient: "bottom",
            visible: false,
            nice: false,
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
            domainLine: {
                visible: false,
            },
            tick: {
                visible: false,
            },
        },
    ],
    stackCornerRadius: 0,
    bar: {
        style: {
            cornerRadius: [5, 5, 5, 5],
            height: 10,
        },
    },
    barBackground: {
        visible: true,
        style: {
            cornerRadius: [5, 5, 5, 5],
            height: 10,
        },
        state: {
            hover: {
                stroke: "#D9D9D9",
                lineWidth: 1,
            },
        },
    },
    extensionMark: [
        {
            type: "text",
            dataId: "barData",
            visible: true,
            style: {
                text: (datum: any) => datum.value,
                fontSize: 12,
                x: (datum: any, ctx: any) => {
                    return ctx.getRegion().getLayoutRect().width + 10
                },
                y: (datum: any, ctx: any) => {
                    return ctx.valueToY([datum.province]) + ctx.yBandwidth() / 2
                },
                textBaseline: "middle",
                textAlign: "left",
                fill: "#595959",
                size: 20,
            },
        },
    ],
    crosshair: {
        yField: {
            visible: false,
        },
    },
    tooltip: {
        mark: {
            title: {
                visible: false,
            },
        },
        dimension: {
            title: {
                visible: false,
            },
        },
        style: {
            shape: {
                shapeType: "circle",
            },
        },
    },
}

const Bar: React.FC<BarProps> = () => {
    return <VChart spec={spec}></VChart>
}
export default Bar
