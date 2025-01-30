
function parseJwt(token) {
  try {
   // Aqu� separamos la segunda parte (el payload) que contiene los datos como la fecha de expiraci�n
    const base64Url = token.split('.')[1]; // Obtenemos el payload que est� en formato base64Url
    
    // El formato base64Url usa '-' y '_' en lugar de '+' y '/' respectivamente
    // Necesitamos reemplazarlos para que sea decodificable en base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    // Decodificamos la cadena base64
    // atob() convierte la cadena base64 a texto legible
    // Luego usamos decodeURIComponent para manejar correctamente los caracteres especiales
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); // Convertimos a formato URI
    }).join(''));
    
    // Finalmente convertimos el payload decodificado a un objeto JSON y lo retornamos
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) {
    return true; // Token inv�lido o sin fecha de expiraci�n
  }
  const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return decodedToken.exp < currentTime; // Retorna true si el token ha expirado
}

export const setupGuards = router => {
  // 👉 router.beforeEach
  // Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
  router.beforeEach(to => {
    /*
         * If it's a public route, continue navigation. This kind of pages are allowed to visited by login & non-login users. Basically, without any restrictions.
         * Examples of public routes are, 404, under maintenance, etc.
         */
    if (to.meta.public)
      return

    /**
         * Check if user is logged in by checking if token & user data exists in local storage
         * Feel free to update this logic to suit your needs
         */
    //const isLoggedIn = !!(useCookie('userData').value && useCookie('accessToken').value)
    const isLoggedIn = !!(localStorage.getItem('user') && localStorage.getItem('token'))

    if(isLoggedIn && isTokenExpired(localStorage.getItem('token'))){
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      return {
        name: 'login',
        query: {
            ...to.query,
            to: to.fullPath !== '/' ? to.path : undefined,
        }
      };
    }

    /*
          If user is logged in and is trying to access login like page, redirect to home
          else allow visiting the page
          (WARN: Don't allow executing further by return statement because next code will check for permissions)
         */
    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn)
        return '/'
      else
        return undefined
    }


    if(to.meta.not_authenticate == false){
      return true;
    }

    if (!isLoggedIn && to.matched.length) {
      /* eslint-disable indent */
            return isLoggedIn
                ? { name: 'not-authorized' }
                : {
                    name: 'login',
                    query: {
                        ...to.query,
                        to: to.fullPath !== '/' ? to.path : undefined,
                    },
                }
            /* eslint-enable indent */
    }
  })
}
