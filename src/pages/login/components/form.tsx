import { Button, Checkbox, Form, Input, Link, Message, Space } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage, useIntl } from "react-intl"
import FormContainer from "./form-container"
import LanguageSelect from "@/components/language-select"
import { IconLock, IconUser } from "@arco-design/web-react/icon"
import { useState } from "react"
import { emailRegexp, passwordRegexp } from "@/constant/user"
import { useMutation } from "@tanstack/react-query"
import userService from "@/service/user"

const FormItem = Form.Item

interface LoginOrSignupFormProps {
    type: "login" | "signup"
}
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm()
    const [remember, setRemember] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const intl = useIntl()
    const placeholder = {
        email: intl.formatMessage({
            id: "login.form.email.placeholer",
        }),
        password: intl.formatMessage({
            id: "login.form.password.placeholer",
        }),
        confirmPassword: intl.formatMessage({
            id: "signup.form.repassword.placeholer",
        }),
        emailError: intl.formatMessage({
            id: "error.email",
        }),
        passwordError: intl.formatMessage({
            id: "error.password",
        }),
        confirmPasswordTips: intl.formatMessage({
            id: "signup.form.repassword.tips",
        }),
        signupSuccess: intl.formatMessage({
            id: "success.signup",
        }),
        loginSuccess: intl.formatMessage({
            id: "success.login",
        }),
    }
    const clickToggleHandle = () => {
        setIsLogin(!isLogin)
    }
    const submitHandle = useMutation(userService[isLogin ? "login" : "signup"], {
        onSuccess() {
            Message.success(isLogin ? placeholder.loginSuccess : placeholder.signupSuccess)
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
                <FormattedMessage id={isLogin ? "login.form.title" : "signup.form.title"} />
            </div>
            <div className="desc">
                <FormattedMessage id={isLogin ? "login.form.desc" : "signup.form.desc"} />
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
                                    return callback(placeholder.email)
                                } else if (!emailRegexp.test(value)) {
                                    return callback(placeholder.emailError)
                                } else {
                                    return callback(null)
                                }
                            },
                        },
                    ]}
                >
                    <Input placeholder={placeholder.email} prefix={<IconUser />} />
                </FormItem>
                <FormItem
                    field="password"
                    rules={[
                        {
                            validator(value, callback) {
                                if (!value) {
                                    return callback(placeholder.password)
                                } else if (!isLogin && !passwordRegexp.test(value)) {
                                    return callback(placeholder.passwordError)
                                } else {
                                    return callback(null)
                                }
                            },
                        },
                    ]}
                >
                    <Input.Password placeholder={placeholder.password} prefix={<IconLock />} />
                </FormItem>
                {!isLogin && (
                    <FormItem
                        field="confirmPassword"
                        rules={[
                            {
                                required: true,
                                validator(value, callback) {
                                    if (!value || form.getFieldValue("password") !== value) {
                                        return callback(placeholder.confirmPasswordTips)
                                    } else {
                                        return callback(null)
                                    }
                                },
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder={placeholder.confirmPassword}
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
                                <FormattedMessage id="login.form.password.remember" />
                            </Checkbox>
                            <Link href="/reset-password" style={{ flexShrink: 0 }}>
                                <FormattedMessage id="login.form.password.forget" />
                            </Link>
                        </div>
                    )}
                    <FormItem style={{ margin: 0 }}>
                        <Button type="primary" htmlType="submit" long>
                            <FormattedMessage id={isLogin ? "login.login" : "login.signup"} />
                        </Button>
                    </FormItem>
                    <Button
                        type="text"
                        long
                        onClick={clickToggleHandle}
                        style={{ color: "#88909c" }}
                    >
                        <FormattedMessage id={isLogin ? "login.signup" : "login.login"} />
                    </Button>
                </Space>
            </Form>
        </FormContainer>
    )
}

export default LoginOrSignupForm
