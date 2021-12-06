export const loggedInCheck = () => {
    if (localStorage.getItem('user')) return true
    return false;
}