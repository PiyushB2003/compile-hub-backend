
const CompilerController = (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    return res.send(`Welcome ${req.user.name}`);
}

const LogoutController = (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }

        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect(process.env.CLIENT_URL);
        });
    });
}

export {CompilerController, LogoutController};