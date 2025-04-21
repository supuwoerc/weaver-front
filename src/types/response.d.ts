interface Creator {
    email: string
    about: string | null
    avatar: string | null
    id: number
    nickname: string | null
}

type Updater = Creator

type SimpleUser = Creator
