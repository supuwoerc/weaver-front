import { Button, Form, Input, Space } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage } from "react-intl"
import FormContainer from "./form-container"
import { IconLock, IconUser } from "@arco-design/web-react/icon"
import { useEffect, useMemo, useState } from "react"
import { emailRegexp, passwordRegexp } from "@/constant/user"
import { Link, useLocation, useSearchParams } from "react-router-dom"
import useUser from "@/hooks/use-user"
import { LoginRequest, SignupRequest } from "@/service/user"
import md5 from "md5"
import { appEnv } from "@/constant/system"
import VerificationModal from "@/components/verification-modal"
import { useTranslator } from "@/hooks/use-translator"

const FormItem = Form.Item

interface LoginOrSignupFormProps {
    type: "login" | "signup"
}

type FormData = (LoginRequest | SignupRequest) & { confirmPassword?: string }

const enum TabType {
    login = "login",
    signup = "signup",
}
const TabArr = [TabType.login, TabType.signup]
const TabKey = "tab"
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm<FormData>()
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const tab = searchParams.get(TabKey)
    const pathnameIsLogin = location.pathname == "/login"
    const pathnameIsSignup = location.pathname == "/signup"
    const isLogin = useMemo(() => {
        return tab === TabType.login || (pathnameIsLogin && !TabArr.includes(tab as TabType))
    }, [tab, pathnameIsLogin])
    const intlMapping = useTranslator({
        loginPrimaryBtn: "login.login.btn.login",
        loginTextBtn: "login.login.btn.signup",
        loginEmailPlaceholder: "login.login.placeholder.email",
        loginPasswordPlaceholder: "login.login.placeholder.password",
        loginForgetPassword: "login.login.forget",
        signupEmailPlaceholder: "login.signup.placeholder.email",
        signupPasswordPlaceholder: "login.signup.placeholder.password",
        signupConfirmPasswordPlaceholder: "login.signup.placeholder.confirmPassword",
        emailError: "login.error.email",
        passwordError: "login.error.password",
    })
    const { login, signup, loginLoading, signupLoading } = useUser(null, () => {
        setSearchParams({ [TabKey]: TabType.login })
    })
    const clickToggleHandle = () => {
        form.clearFields()
        setSearchParams({ tab: isLogin ? TabType.signup : TabType.login })
    }
    const submitHandle = (v: FormData) => {
        v.password = md5(v.password)
        if (isLogin) {
            login(v)
        } else {
            setVisible(true)
        }
    }
    const finishHandle = (id: string, code: string) => {
        setVisible(false)
        const { password = "", email = "" } = form.getFieldsValue()
        const params: SignupRequest = {
            id,
            code,
            password: md5(password),
            email,
        }
        signup(params)
    }
    useEffect(() => {
        if (appEnv.DEV && isLogin) {
            form.setFieldValue("email", "2293172479@qq.com")
            form.setFieldValue("password", "_Abc111111")
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
            <div className="title" data-test="title">
                <FormattedMessage id={isLogin ? "login.login.title" : "login.signup.title"} />
            </div>
            <div className="desc" data-test="desc">
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
                        data-test="email"
                        prefix={<IconUser />}
                    />
                </FormItem>
                <FormItem
                    field="password"
                    className={"ph-no-capture ph-no-capture "} // posthog ignore element
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
                        data-test="password"
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
                            data-test="confirm-password"
                            prefix={<IconLock />}
                        />
                    </FormItem>
                )}
                <Space direction="vertical" size={16}>
                    {isLogin ? (
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
                                data-test="reset-password-link"
                            >
                                <FormattedMessage id="login.login.forget" />
                            </Link>
                        </div>
                    ) : null}
                    <FormItem style={{ margin: 0 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            long
                            loading={isLogin ? loginLoading : signupLoading}
                            data-test="primary-button"
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
                        data-test="switch-button"
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
