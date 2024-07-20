import { Alert, Button, Divider, Form, Input, Result, Space, Steps } from "@arco-design/web-react"
import ResetPasswordContainer from "./reset-password-container"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import Step from "@arco-design/web-react/es/Steps/step"
import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import { useEffect, useMemo } from "react"
import useForm from "@arco-design/web-react/es/Form/useForm"
import { VerifyEmailRequest } from "@/service/reset-password"
import { Link, useSearchParams } from "react-router-dom"
import { emailRegexp } from "@/constant/user"

interface ResetPasswordProps {}
const getIntlMapping = (intl: IntlShape) => {
    return {
        step1: intl.formatMessage({
            id: "resetPassword.step1",
        }),
        step2: intl.formatMessage({
            id: "resetPassword.step2",
        }),
        step3: intl.formatMessage({
            id: "resetPassword.step3",
        }),
        emailPlaceholder: intl.formatMessage({
            id: "resetPassword.step1.email.placeholder",
        }),
        emailError: intl.formatMessage({
            id: "login.error.email",
        }),
    }
}
const ResetPassword: React.FC<ResetPasswordProps> = () => {
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const [searchParams, setSearchParams] = useSearchParams()
    const current = useMemo(() => {
        const cur = Number(searchParams.get("current"))
        if (cur && [1, 2, 3].includes(cur)) {
            return cur
        }
        return 1
    }, [searchParams])
    const [form] = useForm()
    const submitHandle = (v: VerifyEmailRequest) => {
        // v.password = md5(v.password)
        switch (current) {
            case 1:
                break
            case 2:
                break
        }
        setSearchParams(() => ({
            email: v.email,
            current: String(current + 1),
        }))
    }
    const prevClickHandle = () => {
        setSearchParams((prev) => {
            let temp = {
                current: String(current - 1),
            }
            const email = prev.get("email") ?? ""
            temp = Object.assign(temp, email && emailRegexp.test(email) ? { email } : {})
            return temp
        })
    }
    useEffect(() => {
        const email = searchParams.get("email")
        const cur = Number(searchParams.get("current"))
        if (searchParams.get("current") && ![2, 3].includes(cur)) {
            setSearchParams({
                current: "1",
            })
        }
        if ([0, 1, 2].includes(cur) && email && emailRegexp.test(email)) {
            form.setFieldValue("email", email)
        }
    }, [searchParams, current, form, setSearchParams])
    return (
        <ResetPasswordContainer>
            <section>
                <div className="left">
                    <Steps direction="vertical" current={current} style={{ width: 120 }}>
                        <Step title={intlMapping.step1} />
                        <Step title={intlMapping.step2} />
                        <Step title={intlMapping.step3} />
                    </Steps>
                </div>
                <Divider type="vertical" style={{ display: "block", height: "auto" }} />
                <div className="right">
                    {[1, 2].includes(current) ? (
                        <>
                            <Alert content={<FormattedMessage id="resetPassword.step1.alert" />} />
                            <Form
                                form={form}
                                style={{ width: "100%", marginTop: 20 }}
                                autoComplete="off"
                                onSubmit={submitHandle}
                            >
                                <FormItem
                                    field="email"
                                    rules={[
                                        {
                                            validator(value, callback) {
                                                if (!value) {
                                                    return callback(intlMapping.emailPlaceholder)
                                                } else if (!emailRegexp.test(value)) {
                                                    return callback(intlMapping.emailError)
                                                } else {
                                                    return callback(null)
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    <Input
                                        disabled={current > 1}
                                        placeholder={intlMapping.emailPlaceholder}
                                    />
                                </FormItem>
                                <Space direction="vertical" size={16}>
                                    <FormItem style={{ margin: 0 }}>
                                        <Button type="primary" htmlType="submit" long>
                                            <FormattedMessage id="resetPassword.next" />
                                        </Button>
                                    </FormItem>
                                    {current === 2 && (
                                        <FormItem style={{ margin: 0 }}>
                                            <Button type="secondary" long onClick={prevClickHandle}>
                                                <FormattedMessage id="resetPassword.prev" />
                                            </Button>
                                        </FormItem>
                                    )}
                                </Space>
                            </Form>
                        </>
                    ) : (
                        <Result
                            status="success"
                            title={<FormattedMessage id="resetPassword.step3.title" />}
                            subTitle={<FormattedMessage id="resetPassword.step3.title" />}
                            extra={[
                                <Link to={"/login"} key={1}>
                                    {<FormattedMessage id="resetPassword.step3.btn" />}
                                </Link>,
                            ]}
                        ></Result>
                    )}
                </div>
            </section>
        </ResetPasswordContainer>
    )
}
export default ResetPassword
