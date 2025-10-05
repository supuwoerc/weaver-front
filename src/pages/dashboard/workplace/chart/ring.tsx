import { Legend, Pie, PieChart } from "@visactor/react-vchart"
import { useId } from "react"

interface RingProps {}

const data = [
    { type: "oxygen", value: "46.60" },
    { type: "silicon", value: "27.72" },
    { type: "aluminum", value: "8.13" },
    { type: "iron", value: "5" },
    { type: "calcium", value: "3.63" },
]

const Ring: React.FC<RingProps> = () => {
    const id = useId()
    return (
        <PieChart data={[{ id: id, values: data }]}>
            <Pie
                categoryField="type"
                valueField="value"
                outerRadius={0.8}
                innerRadius={0.5}
                padAngle={0.6}
                pie={{
                    style: {
                        cornerRadius: 10,
                    },
                    state: {
                        hover: {
                            outerRadius: 0.85,
                            stroke: "#000",
                            lineWidth: 1,
                        },
                    },
                }}
            />
            <Legend
                visible
                orient="left"
                item={{
                    label: {
                        style: {
                            fill: "#595959",
                        },
                    },
                }}
            />
        </PieChart>
    )
}
export default Ring
