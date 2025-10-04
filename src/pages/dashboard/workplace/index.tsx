import { FC, useEffect, useMemo, useRef, useState } from "react"
import { createSwapy, SlotItemMapArray, Swapy, utils } from "swapy"
import WorkplaceContainer from "./workplace-container"
import SmoothedArea from "./chart/smoothed-area"
import Bar from "./chart/bar"
import Ring from "./chart/ring"

interface Chart {
    id: string
    title: string
    chart: FC<any>
}

const initialItems: Array<Chart> = [
    { id: "1", title: "测试图表", chart: SmoothedArea },
    { id: "2", title: "测试图表", chart: Ring },
    { id: "3", title: "测试图表", chart: Bar },
]

interface WorkplaceProps {}

const Workplace: React.FC<WorkplaceProps> = () => {
    const [items, _setItems] = useState<Chart[]>(initialItems)
    const [slotItemMap, setSlotItemMap] = useState<SlotItemMapArray>(
        utils.initSlotItemMap(items, "id"),
    )
    const slottedItems = useMemo(
        () => utils.toSlottedItems(items, "id", slotItemMap),
        [items, slotItemMap],
    )
    const swapyRef = useRef<Swapy | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)

    const slotItemMapRef = useRef<SlotItemMapArray>(slotItemMap)

    useEffect(() => {
        slotItemMapRef.current = slotItemMap
    }, [slotItemMap])

    useEffect(() => {
        utils.dynamicSwapy(swapyRef.current, items, "id", slotItemMapRef.current, setSlotItemMap)
    }, [items, slotItemMapRef])

    useEffect(() => {
        swapyRef.current = createSwapy(containerRef.current!, {
            manualSwap: true,
            autoScrollOnDrag: true,
        })

        swapyRef.current.onSwap((event) => {
            setSlotItemMap(event.newSlotItemMap.asArray)
        })

        return () => {
            swapyRef.current?.destroy()
        }
    }, [])
    return (
        <WorkplaceContainer className="container" ref={containerRef}>
            <div className="items">
                {slottedItems.map(({ slotId, itemId, item }) => (
                    <div className="slot" key={slotId} data-swapy-slot={slotId}>
                        {item && (
                            <div className="item" data-swapy-item={itemId} key={itemId}>
                                <div className="item-title">{item.title}</div>
                                <item.chart />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </WorkplaceContainer>
    )
}
export default Workplace
