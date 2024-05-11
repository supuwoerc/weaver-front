import { Button, Form, Input, Message } from "@arco-design/web-react"
import classNames from "classnames"
import { FormattedMessage } from "react-intl"
import FormContainer from "./form-container"
import LanguageSelect from "@/components/language-select"
const FormItem = Form.Item

interface LoginOrSignupFormProps {
    type: "login" | "signup"
}
const LoginOrSignupForm: React.FC<LoginOrSignupFormProps> = ({ type }) => {
    const [form] = Form.useForm()
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
                <FormattedMessage id="login.form.title" />
            </div>
            <div className="desc">
                <FormattedMessage id="login.form.desc" />
            </div>
            <Form
                form={form}
                style={{ width: 320 }}
                wrapperCol={{ span: 24 }}
                autoComplete="off"
                onValuesChange={(v, vs) => {
                    // eslint-disable-next-line no-console
                    console.log(v, vs)
                }}
                onSubmit={(v) => {
                    // eslint-disable-next-line no-console
                    console.log(v)
                    Message.success("success")
                }}
            >
                <FormItem
                    field="name"
                    rules={[{ required: true, message: "username is required" }]}
                >
                    <Input placeholder="please enter your username" />
                </FormItem>
                <FormItem
                    field="password"
                    rules={[{ required: true, message: "password is required" }]}
                >
                    <Input placeholder="please enter your password" />
                </FormItem>
                <FormItem
                    field="confirm_password"
                    dependencies={["password"]}
                    rules={[
                        {
                            validator: (v, cb) => {
                                if (!v) {
                                    return cb("confirm_password is required")
                                } else if (form.getFieldValue("password") !== v) {
                                    return cb("confirm_password must be equal with password")
                                }
                                cb(null)
                            },
                        },
                    ]}
                >
                    <Input placeholder="please confirm your password" />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" long>
                        <FormattedMessage id="login.login" />
                    </Button>
                </FormItem>
            </Form>
        </FormContainer>
    )
}

export default LoginOrSignupForm
