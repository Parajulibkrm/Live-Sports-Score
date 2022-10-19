export const getIconData = (event: string) => {
    switch (event) {
        case 'GOAL':
            return { icon: '', title: 'Goal', color: { from: 'indigo', to: 'cyan' } }
        case 'START':
            return { icon: '', title: 'Start', color: { from: 'teal', to: 'lime' } }
        case 'SAVE':
            return { icon: '', title: 'Save', color: { from: 'teal', to: 'blue' } }
        case 'PENALTY':
            return { icon: '', title: 'Penalty', color: { from: 'indigo', to: 'cyan' } }
        case 'RED_CARD':
            return { icon: '', title: 'Red Card', color: { from: 'orange', to: 'red' } }
        case 'YELLOW_CARD':
            return { icon: '', title: 'Yellow Card', color: { from: 'yellow', to: 'yellow' } }
        case 'SUBSTITUTION':
            return { icon: '', title: 'Substitution', color: { from: 'indigo', to: 'cyan' } }
        case 'CORNER':
            return { icon: '', title: 'Corner', color: { from: 'indigo', to: 'cyan' } }
        default:
            return { icon: '', title: event ?? '', color: { from: 'indigo', to: 'cyan' } }
    }
}
