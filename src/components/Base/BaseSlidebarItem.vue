<template>
    <router-link :to="path">
        <div class="misa-slidebar-item">
            <div :class="['misa-slidebar-item-icon', 'misa-icon24', 'misa-icon', slidebarItem['slidebarItemClassItem']]"></div>
            <div class="misa-slidebar-item-text">{{slidebarItem['slidebarItemText']}}</div>
            <div class="misa-tooltip">{{slidebarItem['slidebarItemText']}}</div>
        </div>
    </router-link>
</template>

<script>
    export default {
        name:'BaseSlidebarItem',
        props:{
            slidebarItem:{
                //text của slidebar item
                slidebarItemText:String,
                //class icon
                slidebarItemClassItem:String,
                //route
                path:String,
            },
        },
        computed:{
            path(){
                if(this.slidebarItem.path){
                    return this.slidebarItem.path
                }
                return '/'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>