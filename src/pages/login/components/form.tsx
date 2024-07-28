import { Button, Form, Input, Space } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import FormContainer from "./form-container"
import { IconLock, IconUser } from "@arco-design/web-react/icon"
import { useEffect, useMemo, useState } from "react"
import { emailRegexp, passwordRegexp } from "@/constant/user"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import useUser from "@/hooks/useUser"
import { LoginRequest, SignupRequest } from "@/service/user"
import md5 from "md5"
import { appEnv } from "@/constant/system"
import VerificationModal from "@/components/verification-modal"

const FormItem = Form.Item

interface LoginOrSignupFormProps {
    type: "login" | "signup"
}
const getIntlMapping = (intl: IntlShape) => {
    return {
        loginPrimaryBtn: intl.formatMessage({
            id: "login.login.btn.login",
        }),
        loginTextBtn: intl.formatMessage({
            id: "login.login.btn.signup",
        }),
        loginEmailPlaceholder: intl.formatMessage({
            id: "login.login.placeholder.email",
        }),
        loginPasswordPlaceholder: intl.formatMessage({
            id: "login.login.placeholder.password",
        }),
        loginForgetPassword: intl.formatMessage({
            id: "login.login.forget",
        }),
        signupEmailPlaceholder: intl.formatMessage({
            id: "login.signup.placeholder.email",
        }),
        signupPasswordPlaceholder: intl.formatMessage({
            id: "login.signup.placeholder.password",
        }),
        signupConfirmPasswordPlaceholder: intl.formatMessage({
            id: "login.signup.placeholder.confirmPassword",
        }),
        emailError: intl.formatMessage({
            id: "login.error.email",
        }),
        passwordError: intl.formatMessage({
            id: "login.error.password",
        }),
    }
}
const enum TabType {
    login = "login",
    signup = "signup",
}
const TabArr = [TabType.login, TabType.signup]
const TabKey = "tab"
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm<LoginRequest | SignupRequest>()
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get(TabKey)
    const pathnameIsLogin = location.pathname == "/login"
    const pathnameIsSignup = location.pathname == "/signup"
    const isLogin = useMemo(() => {
        return tab === TabType.login || (pathnameIsLogin && !TabArr.includes(tab as TabType))
    }, [tab, pathnameIsLogin])
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const { login, signup, loginLoading, signupLoading } = useUser(null, () => {
        setSearchParams({ [TabKey]: TabType.login })
    })
    const clickToggleHandle = () => {
        form.clearFields()
        setSearchParams({ tab: isLogin ? TabType.signup : TabType.login })
    }
    const submitHandle = (v: LoginRequest | SignupRequest) => {
        v.password = md5(v.password)
        if (isLogin) {
            login(v)
        } else {
            setVisible(true)
        }
    }
    const finishHandle = (id: string, code: string) => {
        setVisible(false)
        const value = form.getFieldsValue() as SignupRequest
        value.password = md5(value.password)
        value.id = id
        value.code = code
        signup(value)
    }
    useEffect(() => {
        if (appEnv.DEV && isLogin) {
            form.setFieldValue("email", "zhangzhouou@gmail.com")
            form.setFieldValue("password", "_Admin123")
        }
    }, [form, isLogin])
    useEffect(() => {
        const excludeType = !TabArr.includes(searchParams.get(TabKey) as TabType)
        if (pathnameIsLogin && excludeType) {
            setSearchParams({ [TabKey]: TabType.login })
        }
        if (pathnameIsSignup && excludeType) {
            setSearchParams({ [TabKey]: TabType.signup })
        }
    }, [pathnameIsLogin, pathnameIsSignup, searchParams, setSearchParams])
    return (
        <FormContainer className={classNames("form", type)}>
            <div className="title">
                <FormattedMessage id={isLogin ? "login.login.title" : "login.signup.title"} />
            </div>
            <div className="desc">
                <FormattedMessage id={isLogin ? "login.login.desc" : "login.signup.desc"} />
            </div>
            <Form
                form={form}
                style={{ width: 320 }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                onSubmit={submitHandle}
            >
                <FormItem
                    field="email"
                    rules={[
                        {
                            validator(value, callback) {
                                if (!value) {
                                    return callback(
                                        isLogin
                                            ? intlMapping.loginEmailPlaceholder
                                            : intlMapping.signupEmailPlaceholder,
                                    )
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
                        placeholder={
                            isLogin
                                ? intlMapping.loginEmailPlaceholder
                                : intlMapping.signupEmailPlaceholder
                        }
                        prefix={<IconUser />}
                    />
                </FormItem>
                <FormItem
                    field="password"
                    rules={[
                        {
                            validator(value, callback) {
                                if (!value) {
                                    return callback(
                                        isLogin
                                            ? intlMapping.loginPasswordPlaceholder
                                            : intlMapping.signupPasswordPlaceholder,
                                    )
                                } else if (!isLogin && !passwordRegexp.test(value)) {
                                    return callback(intlMapping.passwordError)
                                } else {
                                    return callback(null)
                                }
                            },
                        },
                    ]}
                >
                    <Input.Password
                        placeholder={
                            isLogin
                                ? intlMapping.loginPasswordPlaceholder
                                : intlMapping.signupPasswordPlaceholder
                        }
                        prefix={<IconLock />}
                    />
                </FormItem>
                {!isLogin && (
                    <FormItem
                        field="confirmPassword"
                        rules={[
                            {
                                required: true,
                                validator(value, callback) {
                                    if (!value || form.getFieldValue("password") !== value) {
                                        return callback(
                                            intlMapping.signupConfirmPasswordPlaceholder,
                                        )
                                    } else {
                                        return callback(null)
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={intlMapping.signupConfirmPasswordPlaceholder}
                            prefix={<IconLock />}
                        />
                    </FormItem>
                )}
                <Space direction="vertical" size={16}>
                    {isLogin && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Link
                                to="/reset-password"
                                style={{
                                    flexShrink: 0,
                                }}
                            >
                                <FormattedMessage id="login.login.forget" />
                            </Link>
                        </div>
                    )}
                    <FormItem style={{ margin: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            long
                            loading={isLogin ? loginLoading : signupLoading}
                        >
                            <FormattedMessage
                                id={isLogin ? "login.login.btn.login" : "login.login.btn.signup"}
                            />
                        </Button>
                    </FormItem>
                    <Button
                        type="text"
                        long
                        onClick={clickToggleHandle}
                        style={{ color: "#88909c" }}
                        disabled={loginLoading || signupLoading}
                    >
                        <FormattedMessage
                            id={isLogin ? "login.login.btn.signup" : "login.login.btn.login"}
                        />
                    </Button>
                </Space>
            </Form>
            <VerificationModal visible={visible} finishHandle={finishHandle} />
        </FormContainer>
    )
}

export default LoginOrSignupForm
