const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    id: state => state.user.id,
    roles: state => state.user.roles,
    username: state => state.user.username,
    name: state => state.user.name,
    gender: state => state.user.gender,
    school: state => state.user.school,
    college: state => state.user.college,
    semester: state => state.user.semester,
    student_class: state => state.user.student_class,
    phone: state => state.user.phone,
    email: state => state.user.email,
    avatar: state => state.user.avatar,
}
export default getters
