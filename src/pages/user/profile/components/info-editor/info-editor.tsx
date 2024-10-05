import { Card, Form, Input, Link } from "@arco-design/web-react"
import InfoEditorContainer from "./info-editor-container"
import { useMemo, useState } from "react"
import { IntlShape, useIntl } from "react-intl"
import FormItem from "@arco-design/web-react/es/Form/form-item"
import Row from "@arco-design/web-react/es/Grid/row"
import Col from "@arco-design/web-react/es/Grid/col"

interface InfoEditorProps {}

const getIntlMapping = (intl: IntlShape) => {
    return {
        save: intl.formatMessage({
            id: "user.infoEditor.info.sava",
        }),
        edit: intl.formatMessage({
            id: "user.infoEditor.info.edit",
        }),
        title: intl.formatMessage({
            id: "user.infoEditor.info.title",
        }),
        formEmail: intl.formatMessage({
            id: "user.infoEditor.form.email",
        }),
        formPassword: intl.formatMessage({
            id: "user.infoEditor.form.password",
        }),
        formNickname: intl.formatMessage({
            id: "user.infoEditor.form.nickname",
        }),
        formGender: intl.formatMessage({
            id: "user.infoEditor.form.gender",
        }),
        formAbout: intl.formatMessage({
            id: "user.infoEditor.form.about",
        }),
        formBirthday: intl.formatMessage({
            id: "user.infoEditor.form.birthday",
        }),
        formRoles: intl.formatMessage({
            id: "user.infoEditor.form.roles",
        }),
        formRule: intl.formatMessage({
            id: "user.infoEditor.form.rule",
        }),
    }
}

const getFormItems = (intlMapping: ReturnType<typeof getIntlMapping>) => {
    return [
        { label: intlMapping.formNickname, required: true },
        { label: intlMapping.formEmail, required: true },
        { label: intlMapping.formGender, required: false },
        { label: intlMapping.formBirthday, required: false },
        { label: intlMapping.formAbout, required: false },
        { label: intlMapping.formRoles, required: false },
    ]
}

const InfoEditor: React.FC<InfoEditorProps> = () => {
    const [isEdit, setIsEdit] = useState(false)
    const intl = useIntl()
    const intlMapping = useMemo(() => {
        return getIntlMapping(intl)
    }, [intl])
    const formItems = useMemo(() => {
        return getFormItems(intlMapping)
    }, [intlMapping])
    return (
        <InfoEditorContainer>
            <Card
                title={intlMapping.title}
                hoverable
                bordered={false}
                extra={
                    <Link onClick={() => setIsEdit(!isEdit)}>
                        {isEdit ? intlMapping.save : intlMapping.edit}
                    </Link>
                }
            >
                <Form autoComplete="off" layout={"vertical"} disabled={!isEdit}>
                    <Row gutter={[14, 0]}>
                        {formItems.map((item) => {
                            return (
                                <Col span={12} key={item.label}>
                                    <FormItem
                                        label={item.label}
                                        rules={
                                            item.required
                                                ? [
                                                      {
                                                          required: true,
                                                          message: intlMapping.formRule,
                                                      },
                                                  ]
                                                : []
                                        }
                                    >
                                        <Input placeholder={intlMapping.formRule} />
                                    </FormItem>
                                </Col>
                            )
                        })}
                    </Row>
                </Form>
            </Card>
        </InfoEditorContainer>
    )
}
export default InfoEditor
