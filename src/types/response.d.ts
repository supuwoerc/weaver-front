interface Creator {
    email: string
    about: string | null
    Avatar: string | null
    id: number
    nickname: string | null
}

type Updater = Creator

type SimpleUser = Creator
