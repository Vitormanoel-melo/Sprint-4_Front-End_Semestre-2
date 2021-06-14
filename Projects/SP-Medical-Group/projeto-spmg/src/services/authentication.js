// Verifica se o usuário está logado
export const usuarioLogado = () => localStorage.getItem('login-user-acess') !== null;

// Retorna o payload do token do usuário em formato de objeto JSON
export const parseJwt = () => {

    let base64 = localStorage.getItem('login-user-acess').split('.')[1] 

    return JSON.parse(window.atob(base64))
}

// Função que faz o logout do usuário
export const fazLogout = () => {
    localStorage.removeItem('login-user-acess');
}