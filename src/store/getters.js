const getters = {
    token: state => state.user.token,
    id: state => state.user.id,
    name: state => state.user.name,
    roles: state => state.user.roles,
}
export default getters
