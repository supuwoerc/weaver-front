import { Button, Form, Input, Link, Space } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import FormContainer from "./form-container"
import LanguageSelect from "@/components/language-select"
import { IconLock, IconUser } from "@arco-design/web-react/icon"
import { useMemo, useState } from "react"
import { emailRegexp, passwordRegexp } from "@/constant/user"
import { useLocation } from "react-router-dom"
import useUser from "@/hooks/useUser"
import { LoginRequest, SignupRequest } from "@/service/user"
import md5 from "md5"

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
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm<LoginRequest | SignupRequest>()
    const localtion = useLocation()
    const [isLogin, setIsLogin] = useState(localtion.pathname == "/login")
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const { login, signup } = useUser(intlMapping, null, () => {
        setIsLogin(true)
    })
    const clickToggleHandle = () => {
        form.clearFields()
        setIsLogin(!isLogin)
    }
    const submitHandle = (v: LoginRequest | SignupRequest) => {
        v.password = md5(v.password)
        isLogin ? login(v) : signup(v)
    }
    return (
        <FormContainer className={classNames("form", type)}>
            <LanguageSelect
                style={{
                    position: "fixed",
                    right: "22px",
                    top: "22px",
                }}
            />
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
                            <Link href="/reset-password" style={{ flexShrink: 0 }}>
                                <FormattedMessage id="login.login.forget" />
                            </Link>
                        </div>
                    )}
                    <FormItem style={{ margin: 0 }}>
                        <Button type="primary" htmlType="submit" long>
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
                    >
                        <FormattedMessage
                            id={isLogin ? "login.login.btn.signup" : "login.login.btn.login"}
                        />
                    </Button>
                </Space>
            </Form>
        </FormContainer>
    )
}

export default LoginOrSignupForm
