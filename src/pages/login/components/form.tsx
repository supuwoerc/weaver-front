import { Button, Checkbox, Form, Input, Link, Message, Space } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import FormContainer from "./form-container"
import LanguageSelect from "@/components/language-select"
import { IconLock, IconUser } from "@arco-design/web-react/icon"
import { useMemo, useState } from "react"
import { emailRegexp, passwordRegexp } from "@/constant/user"
import { useMutation } from "@tanstack/react-query"
import userService from "@/service/user"

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
        loginRemember: intl.formatMessage({
            id: "login.login.remember",
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
        loginSuccess: intl.formatMessage({
            id: "login.login.success",
        }),
        signupSuccess: intl.formatMessage({
            id: "login.signup.success",
        }),
        emailError: intl.formatMessage({
            id: "login.error.email",
        }),
        passwordError: intl.formatMessage({
            id: "login.error.email",
        }),
    }
}
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm()
    const [remember, setRemember] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const clickToggleHandle = () => {
        setIsLogin(!isLogin)
    }
    const submitHandle = useMutation(userService[isLogin ? "login" : "signup"], {
        onSuccess() {
            Message.success(isLogin ? intlMapping.loginSuccess : intlMapping.signupSuccess)
        },
        onError(error) {
            Message.error(`${error}`)
        },
    })
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
                onSubmit={(v) => {
                    submitHandle.mutate(v)
                }}
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
                            <Checkbox value={remember} onChange={setRemember}>
                                <FormattedMessage id="login.login.remember" />
                            </Checkbox>
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
