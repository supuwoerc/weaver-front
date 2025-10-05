import Col from "@arco-design/web-react/es/Grid/col"
import Row from "@arco-design/web-react/es/Grid/row"
import LoginContainer from "./login-container"
import { Carousel } from "@arco-design/web-react"
import ufo from "@/assets/login/ufo.png"
import write from "@/assets/login/write.png"
import stockpile from "@/assets/login/stockpile.png"
import LoginOrSignupForm from "./form/index"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"
import { SplitText } from "gsap/all"
import gsap from "gsap"

interface LoginProps {}

const items = [
    {
        title: "开源的前后端代码",
        subTitle: "代码全部开源，从零开始构建系统",
        image: ufo,
    },
    {
        title: "主流的技术栈，集成多种解决方案",
        subTitle: "国际化，RBAC权限，状态管理...",
        image: write,
    },

    {
        title: "丰富技术储备，从系统构建中学习技术",
        subTitle: "纸上得来终觉浅，绝知此事要躬行",
        image: stockpile,
    },
]
const Login: React.FC<LoginProps> = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)
    const splitRef = useRef<{ title?: SplitText; sub?: SplitText }>({})
    gsap.registerPlugin(SplitText)

    useGSAP(
        () => {
            timelineRef.current?.kill()
            splitRef.current.title?.revert()
            splitRef.current.sub?.revert()

            const titleSelector = `.item[data-index='${currentIndex}'] .title`
            const subTitleSelector = `.item[data-index='${currentIndex}'] .sub-title`
            const coverSelector = `.item[data-index='${currentIndex}'] .cover`

            // 中文使用 chars
            const titleSplit = SplitText.create(titleSelector, { type: "chars" })
            const subTitleSplit = SplitText.create(subTitleSelector, { type: "chars" })
            splitRef.current = { title: titleSplit, sub: subTitleSplit }

            const tl = gsap.timeline({
                delay: 0.2,
            })
            tl.from(coverSelector, {
                duration: 0.6,
                yPercent: 8,
                ease: "back.out(1.7)",
            })
                .from(
                    titleSplit.chars,
                    {
                        opacity: 0,
                        yPercent: 100,
                        display: "inline-block",
                        duration: 1,
                        stagger: 0.02,
                        ease: "expo.out",
                    },
                    "<+=0.2",
                )
                .from(
                    subTitleSplit.chars,
                    {
                        opacity: 0,
                        display: "inline-block",
                        duration: 0.5,
                        stagger: 0.03,
                        ease: "power1.inOut",
                    },
                    "<",
                )

            timelineRef.current = tl
        },
        { dependencies: [currentIndex], scope: carouselRef.current!, revertOnUpdate: false },
    )
    useEffect(() => {
        return () => {
            timelineRef.current?.kill()
            splitRef.current.title?.revert()
            splitRef.current.sub?.revert()
        }
    }, [])
    return (
        <LoginContainer>
            <Row className="row">
                <Col xs={0} sm={10} className="col">
                    <div className="carousel-container">
                        <Carousel
                            ref={carouselRef}
                            className="carousel"
                            animation="slide"
                            autoPlay={{
                                interval: 10000,
                            }}
                            onChange={(index) => setCurrentIndex(index)}
                            indicatorType="slider"
                        >
                            {items.map((item, index) => (
                                <div className="item" data-index={index} key={index}>
                                    <p className="title">{item.title}</p>
                                    <p className="sub-title">{item.subTitle}</p>
                                    <img className="cover" src={item.image} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </Col>
                <Col xs={24} sm={14} className="col">
                    <div className="main">
                        <LoginOrSignupForm type="login" />
                    </div>
                </Col>
            </Row>
        </LoginContainer>
    )
}
export default Login
