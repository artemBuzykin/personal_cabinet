export function cookieFromRequest(req, key) {
    if (!req.headers.cookie) {
        return
    }

    const cookie = req.headers.cookie.split(';').find(
        c => c.trim().startsWith(`${key}=`)
    )

    if (cookie) {
        return cookie.split('=')[1]
    }
}

/**
 * https://router.vuejs.org/en/advanced/scroll-behavior.html
 */
export function scrollBehavior(to, from, savedPosition) {
    if(savedPosition){
      return savedPosition
    } else{
    //   const position = {};
      if(to.hash){
        // position.selector = to.hash;
        // position.offset = {y: 190}
        // if(document.querySelector(to.hash)){
        //   return position;
        // }
      }
      else{
        return {x:0, y: 0}
      }
    }
}
// export function scrollBehavior(to, from, savedPosition) {
//     if (savedPosition) {
//         return savedPosition
//     }

//     let position = {}

//     if (to.matched.length < 2) {
//         position = {
//             x: 0,
//             y: 0
//         }
//     } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
//         position = {
//             x: 0,
//             y: 0
//         }
//     }
//     if (to.hash) {
//         position = {
//             selector: to.hash
//         }
//     }

//     return position
// }
