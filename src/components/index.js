import Header from './header.vue'
import Footer from './footer.vue'
export const componentPlugin={
    install(app){
        app.component('Header',Header)
        app.component('Footer',Footer)
    }
}