export type LinkType = {
    text: string
    link: string
}


export type navLinkType = {
    text: string
    link: string
}

export const navLinks: navLinkType[] = [
    {
        text: 'Home',
        link: '/',
    },
    {
        text: 'products',
        link: '/products',
    },
    {
        text: 'Checkout',
        link: '/checkout',
    },
]

export type SelectItem = { text: string; value: string }