exports.signUpErrors = (err) => {
    var errors = { name: '', username: '', email: '', password: 'mauvais password' };

    if (err.message.includes('name'))
        errors.name = 'name incorrect';

    if (err.message.includes('username'))
        errors.username = 'username incorrect ou deja pris';

    if (err.message.includes('email'))
        errors.email = 'email incorrect ou deja utilise';

    if (err.message.includes('password'))
        errors.password = 'le mot de pass doit faire 6 caracteres ou plus';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('username'))
        errors.username = 'cet username est deja pris';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'cet email est deja pris'

    return errors
}

exports.signInErrors = (err) => {
    var errors = { email: '', password: 'mauvais password' };
    if (err.message.includes('email'))
        errors.email = 'email incorrect ou deja utilise';

    if (err.message.includes('password'))
        errors.password = 'le mot de pass doit faire 6 caracteres ou plus';

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = 'cet email est deja pris'

}