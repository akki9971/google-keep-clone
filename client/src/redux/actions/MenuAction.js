export const MENU_TOGGLE = 'MENU_TOGGLE'
export const SHOW_MENU = 'SHOW_MENU'
export const HIDE_MENU = 'HIDE_MENU'

export const onMenuToggle = () => {
    return {
        type: MENU_TOGGLE,
        payload: null
    }
}

export const onShowMenu = () => {
    return {
        type: SHOW_MENU,
        payload: true
    }
}

export const onHideMenu = () => {
    return {
        type: HIDE_MENU,
        payload: false
    }
}